const Contact = require("../../models/contact");

const getAll = async (req, res) => {
	const { id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;

	const result = await Contact.find(
		favorite ? { owner, favorite } : { owner },
		"-createdAt -updatedAt",
		{ skip, limit }
	).populate("owner", "email subscription");
	res.status(200).json(result);
};

module.exports = getAll;
