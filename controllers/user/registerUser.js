const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const registerUser = async (req, res) => {
	const { email, password, name } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw createError(409, "Email already exist");
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const result = await User.create({
		email,
		password: hashPassword,
		name,
	});

	res.status(201).json({
		email: result.email,
		name: result.name,
	});
};

module.exports = registerUser;
