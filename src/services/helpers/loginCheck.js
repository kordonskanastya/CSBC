const { ENVIRONMENT } = require('../../../constants');
const {
  generateAccessToken,
  generateRefreshToken,
  hashPassword
 } = require('../../utils');
const config = require('../../config');
const db = require('../../db')(config.db);

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

async function loginCheck (body) {
    const { email } = body;
    await checkPassword(body);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    await db.putRefreshToken(email, refreshToken);
    if ( ENVIRONMENT === 'dev') {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
}

module.exports = loginCheck;
