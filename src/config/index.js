require('dotenv').config();

function exit(field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY || exit('AccessTokenSecretKey'),
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY || exit('REFRESHTokenSecretKey'),
  salt: process.env.SALT || exit('salt'),
  db: {
    user: process.env.DB_USER || exit('db_user'),
    host: process.env.DB_HOST || exit('db_host'),
    port: process.env.DB_PORT || exit('db_port'),
    database: process.env.DB_NAME || exit('db_name'),
    password: process.env.DB_PASS || exit('db_pass')
  }
};

module.exports = config;
