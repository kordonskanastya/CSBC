const config = require('../config');
const Constants = require('../Constants');
const {sendEmailWithPassword} = require('../utils');
const {
  hashPassword,
  generatePassword,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils');
const db = require('../db')(config.db);
const statusCode = require('../statusCode');
const { unauthorized } = require('../statusCode');

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

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

async function changePassword(req) {
  const pass = generatePassword();
  const user = {
    email: req.body.email,
    newPassword: hashPassword(pass),
  };
  sendEmailWithPassword(user.email, pass);
  const message = await db.changePassword(user);
  return successMessage(message);
}

async function checkPassword(body) {
  const {email: emailUser, password: passwordUser} = body;
  const userFromDB = await db.getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    throw new Error('No user was found');
  }
  const hashUserPassword = hashPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Password is not correct');
  }
}

async function authenticatingUser (body) {
    const { email } = body;
    await checkPassword(body);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    await db.putRefreshToken(email, refreshToken);
    if ( config.env === Constants.env.dev ) {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
  return accessToken;
}

async function loginCheck (body) {
  try {
    const accessToken = await authenticatingUser(body);
    return successMessage(accessToken);
  } catch (err) {
    return { code: unauthorized, message: err.message };
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByID,
  changePassword,
  loginCheck,
};
