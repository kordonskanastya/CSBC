require('dotenv').config();
const constants = require('../utils/constants');

function exit(field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  env: process.env.ENVIRONMENT || constants.env.dev,
  port: process.env.PORT || 3000,
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET_KEY || exit('AccessTokenSecretKey'),
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET_KEY || exit('REFRESHTokenSecretKey'),
  passwordSecret: process.env.PASSWORD_SECRET || exit('passwordSecret'),
  db: {
    user: process.env.DB_USER || exit('db_user'),
    host: process.env.DB_HOST || exit('db_host'),
    port: process.env.DB_PORT || exit('db_port'),
    database: process.env.DB_NAME || exit('db_name'),
    password: process.env.DB_PASS || exit('db_pass'),
  },
  email: {
    user: process.env.EMAIL_USER || exit('email_user'),
    password: process.env.EMAIL_PASSWORD || exit('email_password'),
  },
};

module.exports = config;
