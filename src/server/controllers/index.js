const users = require('./users');
const courses = require('./courses');
const auth = require('./auth');
const groups = require('./groups');
<<<<<<< HEAD
const students = require('./students');
=======
const specialities=require('./specialities');
>>>>>>> 35288fe (added specialities crud)

module.exports={
  ...users,
  ...courses,
  ...auth,
  ...groups,
<<<<<<< HEAD
  ...students
=======
  ...specialities
>>>>>>> 35288fe (added specialities crud)
};
