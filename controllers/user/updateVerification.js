const { verifyEmailSchema, createError, sendMail } = require("../../helpers");
const User = require("../../models/user");

const updateVerification = async (req, res, next) => {
	try {
		const { error } = verifyEmailSchema.validate(req.body);
		if (error) {
			throw createError(400);
		}
		const { email } = req.body;
		const user = User.findOne({ email });
		if (!user) {
			throw createError(404);
		}

		if (user.verify) {
			throw createError(400, "Verification has already been passed");
		}

		const mail = {
			to: email,
			subject: "vrerify your email",
			html: `<a href="http://localhost:3000/api/auth/${user.verificationToken}"> click to verify your email</a>`,
		};

		await sendMail(mail);
		res.json({
			message: "verification mail sent",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = updateVerification;
