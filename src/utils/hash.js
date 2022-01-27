const { createHmac } = require('crypto');
const { salt } = require('../config');

function hashingPassword (password) {
  return createHmac('sha256', salt)
               .update(password)
               .digest('hex');
};

module.exports = hashingPassword;
