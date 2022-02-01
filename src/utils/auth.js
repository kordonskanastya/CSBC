const config = require('../config');
const {hashingPassword} = require('./hash');
const db = require('../db')(config.db);
const statusCode = require('../statusCode');

async function authUser(req, res) {
  const {email: emailUser, password: passwordUser} = req.body;
  const userFromDB = await db.getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    res.status(statusCode.badRequest);
    res.json('User not found');
    return false;
  }
  const hashUserPassword = hashingPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    res.status(statusCode.badRequest);
    res.json('Bad username or password');
    return false;
  }
  return true;
}

module.exports = {
  authUser
};



