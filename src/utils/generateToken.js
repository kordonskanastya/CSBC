const jwt = require('jsonwebtoken');
const config = require('../config');

function generateAccessToken(email, userId, userRole) {
  return jwt
    .sign({email, userId, userRole},
      config.accessTokenSecret, {expiresIn: '12h'});
}

function generateRefreshToken(email) {
  return jwt.sign({email}, config.refreshTokenSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
