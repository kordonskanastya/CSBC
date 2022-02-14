const { env } = require('../config');
const constants = require('../utils/constants');
const db = require('../db');
const statusCode = require('../statusCode');
const {
  hashPassword,
  generatePassword,
  generateAccessToken,
  generateRefreshToken,
  sendEmailWithPassword,
  successMessage
} = require('../utils');

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
    if ( env === constants.env.dev ) {
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
    return { code: statusCode.unauthorized, message: err.message };
  }
}

// ------------------------------------

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

module.exports = {
  loginCheck,
  changePassword
};
