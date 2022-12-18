const express = require("express");
const router = express.Router();

const { authorize, validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const {
	ctrlWrapper,
	schemaAddNew,
	schemaUpdate,
	schemaFavorite,
} = require("../../helpers");

router.get("/", authorize, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authorize, ctrlWrapper(ctrl.getById));

router.post(
	"/",
	authorize,
	validateBody(schemaAddNew),
	ctrlWrapper(ctrl.addNewContact)
);

router.delete("/:contactId", authorize, ctrlWrapper(ctrl.deleteContactById));

router.put(
	"/:contactId",
	authorize,
	validateBody(schemaUpdate),
	ctrlWrapper(ctrl.editContact)
);

router.patch(
	"/:contactId/favorite",
	authorize,
	validateBody(schemaFavorite),
	ctrlWrapper(ctrl.toggleFavorite)
);

module.exports = router;
