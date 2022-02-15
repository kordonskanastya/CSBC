const users = require('./users');
const courses = require('./courses');
const auth = require('./auth');
const groups = require('./groups');

module.exports = {
  ...users,
  ...courses,
  ...auth,
  ...groups
};
