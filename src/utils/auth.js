const bcrypt = require('bcrypt');

const service = require('../services');
const statusCode = require('../statusCode');

async function authUser(req, res) {
  let isValid;
  const {email: emailUser, password: passwordUser} = req.body;

  const user = await service.getUserByEmail(emailUser);
  if (user.message.length === 0) {
    res.status(statusCode.badRequest);
    res.json('User not found');
    return false;
  }
  const userFromDB = {
    email: user.message[0].email,
    password: user.message[0].password
  };

  // eslint-disable-next-line consistent-return
  await bcrypt.compare(passwordUser, userFromDB.password).then(data => {
    if (emailUser !== userFromDB.email || data === false) {
      res.status(statusCode.badRequest);
      res.json('Bad username or password');
      return false;
    }
    isValid = true;
  });
  return isValid;
}

module.exports = {
  authUser
};
