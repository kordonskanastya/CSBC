const db = require('../db');
const { successMessage, hashPassword } = require('../utils');

async function getAllUsers() {
  try {
    const dbData = await db.getAllUsers();
    return successMessage(dbData);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

async function createUser(req) {
  try {
    req.password = hashPassword(req.password);
    const newUser = await db.createUser(req);
    return successMessage(newUser);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

async function updateUser(req) {
  try {
    const updatedUser = await db.updateUser({ id: req.params.id, ...req.body });
    return successMessage(updatedUser);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

async function deleteUser(req) {
  try {
    const deletedUser = await db.deleteUser(req.params.id);
    return successMessage(deletedUser);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

async function getUserByID(req) {
  try {
  const user = await db.getUserByID(req);
  return successMessage(user);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID
};
