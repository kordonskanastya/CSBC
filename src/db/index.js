const config = require('../config');
const common = require('./common')(config.db);
const auth = require('./auth')(config.db);
const userAdmin = require('./userAdmin')(config.db);
const subjectAdmin = require('./subjectAdmin')(config.db);

module.exports = {
  ...common,
  ...auth,
  ...userAdmin,
  ...subjectAdmin
};
