const users = require('./users');
const courses = require('./courses');
const auth = require('./auth');

module.exports={
  ...users,
  ...courses,
  ...auth
};