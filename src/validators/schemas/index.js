const admin = require('./admin');
const auth = require('./auth');

module.exports ={
  ...admin,
  ...auth
};
