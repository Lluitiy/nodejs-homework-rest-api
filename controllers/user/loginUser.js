require("dotenv").config();

const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw createError(401, "Email wrong");
	}
	if (!user.verify) {
		throw createError(401, "Email not verified");
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw createError(401, "Wrong password");
	}
	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email,
			subscription: user.subscription,
		},
	});
};

module.exports = loginUser;
