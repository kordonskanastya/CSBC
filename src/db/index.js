const config = require('../config');
const common = require('./common')(config.db);
const auth = require('./auth')(config.db);
const userAdmin = require('./userAdmin')(config.db);
const coursesAdmin = require('./coursesAdmin')(config.db);
const groupsAdmin = require('./groupsAdmin')(config.db);
<<<<<<< HEAD
const studentAdmin = require('./studentAdmin')(config.db);
=======
const specialitiesAdmin = require('./specialitiesAdmin')(config.db);
>>>>>>> 35288fe (added specialities crud)

module.exports = {
  ...common,
  ...auth,
  ...userAdmin,
  ...coursesAdmin,
  ...groupsAdmin,
<<<<<<< HEAD
  ...studentAdmin
=======
  ...specialitiesAdmin
>>>>>>> 35288fe (added specialities crud)
};
