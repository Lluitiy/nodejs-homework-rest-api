const express = require("express");
const router = express.Router();
const { authorize } = require("../../middlewares");

const {
	schemaAddNew,
	schemaUpdate,
	schemaFavorite,
	createError,
} = require("../../helpers/index");

const Contact = require("../../models/contact");

router.get("/", authorize, async (req, res, next) => {
	try {
		const { id: owner } = req.user;
		const result = await Contact.find({ owner }).populate(
			"owner",
			"subscription email"
		);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

router.get("/:contactId", authorize, async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await Contact.findById(contactId);
		if (!result) {
			throw createError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", authorize, async (req, res, next) => {
	try {
		const { id: owner } = req.user;
		const { error } = schemaAddNew.validate(req.body);
		if (error) {
			throw createError(400, "missing required name field");
		}
		const result = await Contact.create({ ...req.body, owner });
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", authorize, async (req, res, next) => {
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
});

router.put("/:contactId", authorize, async (req, res, next) => {
	try {
		const { error } = schemaUpdate.validate(req.body);
		if (error) {
			throw schemaUpdate(400, "missing fields");
		}
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.patch("/:contactId/favorite", authorize, async (req, res, next) => {
	try {
		const { error } = schemaFavorite.validate(req.body);
		if (error) {
			throw schemaUpdate(400, "missing fields");
		}
		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
