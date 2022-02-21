const { env } = require('../config');
const constants = require('../utils/constants');
const db = require('../db');
const {
  hashPassword,
  generatePassword,
  generateAccessToken,
  generateRefreshToken,
  sendEmailWithPassword,
  successMessage
} = require('../utils');


// eslint-disable-next-line consistent-return
async function checkPassword(body) {
  try {

    const { email: emailUser, password: passwordUser } = body;
    const userFromDB = await db.getUserByEmail(emailUser);
    if (userFromDB.length === 0) {
      throw new Error('No user was found');
    }
    const hashUserPassword = hashPassword(passwordUser);
    if (hashUserPassword !== userFromDB.password) {
      throw new Error('Password is not correct');
    }
    return userFromDB;
  } catch (err){
    throw new Error (err.message || err);
  }
}

async function authenticatingUser (body) {
  try {
    const { email } = body;
    const { id: userId, role: userRole } = await checkPassword(body);
    const accessToken = generateAccessToken(email, userId, userRole);
    const refreshToken = generateRefreshToken(email);
    await db.putRefreshToken(email, refreshToken);
    if (env === constants.env.dev) {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
    return accessToken;
  }
  catch (err) {
    throw new Error (err.message || err);
  }
}

async function loginCheck (body) {
  try {
    const accessToken = await authenticatingUser(body);
    return successMessage(accessToken);
  } catch (err) {
    throw new Error (err.message || err);
  }
}

// ------------------------------------

async function changePassword(req) {
  try {
    const pass = generatePassword();
    const user = {
      email: req.body.email,
      newPassword: hashPassword(pass),
    };
    sendEmailWithPassword(user.email, pass);
    const message = await db.changePassword(user);
    return successMessage(message);
  }
  catch (err){
    throw new Error (err.message || err);
  }
}

module.exports = {
  loginCheck,
  changePassword
};
