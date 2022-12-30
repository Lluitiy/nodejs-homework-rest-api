const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { HW05 } = process.env;

sgMail.setApiKey(HW05);

const sendMail = async (data) => {
	const mail = { ...data, from: "pavlovovzhynskyy@gmail.com" };
	try {
		await sgMail.send(mail);
		return true;
	} catch (error) {
		throw new Error();
	}
};

module.exports = sendMail;
