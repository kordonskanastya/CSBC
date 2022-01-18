const { createHmac } = await import('crypto');
const { secretKey } = require('../config');

function hashingPassword (password) {
  return createHmac('sha256', secretKey)
               .update(password)
               .digest('hex');
};

module.exports = hashingPassword;
