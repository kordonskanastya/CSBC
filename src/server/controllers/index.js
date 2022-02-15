const users = require('./users');
const courses = require('./courses');
const auth = require('./auth');
const groups = require('./groups');
const students = require('./students');
const specialities=require('./specialities');


module.exports={
  ...users,
  ...courses,
  ...auth,
  ...groups,
  ...students,
  ...specialities
};
