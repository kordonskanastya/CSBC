const jwt = require('jsonwebtoken');
const config = require('../config');

function generateAccessToken(email, id, role) {
  return jwt
    .sign({email, id, role}, config.accessTokenSecret, {expiresIn: '12h'});
}

function generateRefreshToken(email) {
  return jwt.sign({email}, config.refreshTokenSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
