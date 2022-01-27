const bcrypt = require('bcrypt');


function hashingPassword(password) {
  return bcrypt.hashSync(password, 10);
}

module.exports = hashingPassword;
