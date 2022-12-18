const Contact = require("../../models/contact");

const { createError } = require("../../helpers");

const deleteContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndDelete(contactId);
		if (!result) {
			throw createError(404, "Not Found");
		}
		res.status(200).json({
			message: "contact deleted",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = deleteContactById;
