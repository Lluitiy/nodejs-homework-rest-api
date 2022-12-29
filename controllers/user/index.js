const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const avatar = require("./avatar");
const verify = require("./verify");
const updateVerification = require("./updateVerification");

module.exports = {
	registerUser,
	loginUser,
	logout,
	getCurrent,
	updateSubscription,
	avatar,
	verify,
	updateVerification,
};
