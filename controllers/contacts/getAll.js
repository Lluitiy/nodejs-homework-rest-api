const Contact = require("../../models/contact");

const { createError } = require("../../helpers");

const getAll = async (req, res) => {
	const { id: owner } = req.user;
	const { limit } = req.query;

	const pageNum = req.query.page == null ? 1 : req.query.page;
	const total = await Contact.count();
	const pages = Math.ceil(total / limit);

	if (pageNum > pages) {
		throw createError(
			403,
			`Please enter number of pages less then total of : ${pages}`
		);
	}

	const startFrom = (pageNum - 1) * limit;
	const result = await Contact.find({ owner })
		.populate("owner", "subscription email")
		.skip(startFrom)
		.limit(limit);
	res.status(200).json(result);
};

module.exports = getAll;
