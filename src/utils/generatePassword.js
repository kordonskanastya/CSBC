function generatePassword() {
  let password = '';
  const symbols =
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij
    klmnopqrstuvwxyz0123456789!№;%:?*()_+=`;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 9; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
}

module.exports = generatePassword;
