const db = require('../db');
const { successMessage, hashPassword } = require('../utils');
const statusCode = require('../statusCode');

async function getAllUsers() {
  try {
    const dbData = await db.getAllUsers();
    return successMessage(dbData);
  } catch (err) {
    return  { code: statusCode.serverError, message: err.message };
  }
}

async function createUser(req) {
  try {
    req.password = hashPassword(req.password);
    const newUser = await db.createUser(req);
    return successMessage(newUser);
  } catch (err) {
    return { code: statusCode.serverError, message: err.message };
  }
}

async function updateUser(req) {
  try {
    const updatedUser = await db.updateUser({ id: req.params.id, ...req.body });
    return successMessage(updatedUser);
  } catch (err) {
    return { code: statusCode.serverError, message: err.message };
  }
}

async function deleteUser(req) {
  try {
    const deletedUser = await db.deleteUser(req.params.id);
    return successMessage(deletedUser);
  } catch (err) {
    return { code: statusCode.serverError, message: err.message };
  }
}

async function getUserByID(req) {
  try {
  const user = await db.getUserByID(req);
  return successMessage(user);
  } catch (err) {
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID
};
