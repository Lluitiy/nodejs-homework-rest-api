const getAll = require("./getAll");
const getById = require("./getById");
const addNewContact = require("./addNewContact");
const deleteContactById = require("./deleteContactById");
const editContact = require("./editContact");
const toggleFavorite = require("./toggleFavorite");

module.exports = {
	getAll,
	getById,
	addNewContact,
	deleteContactById,
	editContact,
	toggleFavorite,
};
