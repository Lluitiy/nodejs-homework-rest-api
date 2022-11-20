const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contacts = require("../../models/contacts");

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw new Error(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      throw schemaUpdate(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw new Error(404, "Not Found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      throw schemaUpdate(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContactsById(contactId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
