const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
	userRegistrationSchema,
	userLoginSchema,
} = require("../../helpers/index");
const User = require("../../models/user");

const { authorize } = require("../../middlewares");
const { createError } = require("../../helpers");

const router = express.Router();

router.post("/register", async (req, res, next) => {
	try {
		const { error } = userRegistrationSchema.validate(req.body);
		if (error) {
			throw createError(400);
		}
		const { email, password, subscription } = req.body;
		console.log({ email, subscription });
		const user = await User.findOne({ email });
		if (user) {
			throw createError(409, "Email already exist");
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const result = await User.create({
			email,
			password: hashPassword,
			subscription,
		});
		res.status(201).json({
			email: result.email,
			subscription: result.subscription,
		});
	} catch (error) {
		next(error);
	}
});

const { SECRET_KEY } = process.env;

router.post("/login", async (req, res, next) => {
	try {
		const { error } = userLoginSchema.validate(req.body);
		if (error) {
			throw createError(400);
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw createError(401, "Email wrong");
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
	} catch (error) {
		next(error);
	}
});

router.get("/logout", authorize, async (req, res, next) => {
	try {
		const { _id } = req.user;
		await User.findByIdAndUpdate(_id, { token: null });
		res.json({
			status: 200,
			message: "Logout success",
		});
	} catch (error) {
		next(error);
	}
});

router.get("/current", authorize, async (req, res) => {
	const { subscription, email } = req.user;
	res.json({
		email,
		subscription,
	});
});

module.exports = router;
