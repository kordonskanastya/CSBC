const service = require('../services');
const statusCode = require('../statusCode');

async function authUser(req, res) {
  const {email: emailUser, password: passwordUser} = req.body;

  const user = await service.getUserByEmail(emailUser);
  if (user.message.length === 0){
    res.json('User not found');
    return false;
  }
  const userFromDB = {
    email: user.message[0].email,
    password: user.message[0].password
  };
  if (emailUser !== userFromDB.email ||
    passwordUser !== userFromDB.password) {

    res.status(statusCode.badRequest);
    res.json('Bad username or password');
  }
  return true;
}

module.exports = {
  authUser
 };
