const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schemaUpdate = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
});

const schemaAddNew = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().min(8).required(),
});
const schemaFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string().required(),
});
const userRegistrationSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(8).required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
	avatarURL: Joi.string(),
});

const userLoginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(8).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});
module.exports = {
	schemaAddNew,
	schemaUpdate,
	schemaFavorite,
	userRegistrationSchema,
	userLoginSchema,
	updateSubscriptionSchema,
	verifyEmailSchema
};
