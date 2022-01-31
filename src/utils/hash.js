const bcrypt = require('bcrypt');

function hashingPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function generatePassword() {
  let password = '';
  let symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=';
  for (let i = 0; i < 9; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
}

module.exports = { hashingPassword, generatePassword };
