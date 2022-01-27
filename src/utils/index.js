const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

function generateAccessToken (username) {
  return jwt.sign({ username }, secretKey, { expiresIn: '3000s'});
}

function generateRefreshToken (username) {
  return jwt.sign({ username }, secretKey, { expiresIn: '3000s'});
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
