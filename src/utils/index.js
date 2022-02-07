const generateToken = require('./generateToken');
const hashPassword = require('./hashPassword');
const generatePassword = require('./generatePassword');
const sendEmailWithPassword = require('./sendEmailWithPassword');
const swagger = require('./swagger');

module.exports = {
  ...generateToken,
  hashPassword,
  generatePassword,
  sendEmailWithPassword,
  ...swagger
};
