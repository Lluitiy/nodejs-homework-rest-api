const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const { createError, sendMail } = require("../../helpers");

const registerUser = async (req, res) => {
	const { email, password, name } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw createError(409, "Email already exist");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const verificationToken = nanoid();

	const result = await User.create({
		email,
		password: hashPassword,
		name,
		avatarURL,
		verificationToken,
	});

	const mail = {
		to: email,
		subject: "vrerify your email",
		html: `<a href="http://localhost:3000/api/auth/${verificationToken}"> click to verify your email</a>`,
	};
	await sendMail(mail);
	res.status(201).json({
		email: result.email,
		name: result.name,
	});
};

module.exports = registerUser;
