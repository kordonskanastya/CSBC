const db = require('../db');
const { successMessage, hashPassword } = require('../utils');

async function getAllUsers() {
  const dbData = await db.getAllUsers();
  return successMessage(dbData);
}

async function createUser(req) {
  req.password = hashPassword(req.password);
  const newUser = await db.createUser(req);
  return successMessage(newUser);
}

async function updateUser(req) {
  const updatedUser = await db.updateUser({ id: req.params.id, ...req.body });
  return successMessage(updatedUser);
}

async function deleteUser(req) {
  const deletedUser = await db.deleteUser(req.params.id);
  return successMessage(deletedUser);
}

async function getUserByID(req) {
  const user = await db.getUserByID(req);
  return successMessage(user);
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID
};
