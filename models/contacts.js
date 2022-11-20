const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contatcsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (allContacts) => {
  await fs.writeFile(contatcsPath, JSON.stringify(allContacts, null, 2));
};

const getAllContacts = async () => {
  const allContacts = await fs.readFile(contatcsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (id) => {
  const allContacts = await getAllContacts();
  const contactsById = await allContacts.find((contact) => contact.id === id);
  if (!contactsById) {
    return null;
  }
  return contactsById;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await getAllContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};
const removeContact = async (id) => {
  const allContacts = await getAllContacts();
  const idx = allContacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }

  const [removedContact] = allContacts.splice(idx, 1);
  updateContacts(allContacts);
  return removedContact;
};

const updateContactsById = async (id, body) => {
  const allContacts = await getAllContacts();
  const idx = allContacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id, ...body };
  updateContacts(allContacts);
  return allContacts[idx];
};
module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactsById,
};
