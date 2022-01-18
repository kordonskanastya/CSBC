require('dotenv').config();

function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  port: process.env.PORT || 3000,
  secretKey: process.env.TOKEN_SECRET_KEY || exit('secretKey'),
  username: process.env.USER_NAME || exit('username'),
  password: process.env.PASSWORD || exit('password'),
  pg: {
    user: process.env.DB_USER || exit('db_user'),
    host: process.env.DB_HOST || exit('db_host'),
    port: process.env.DB_PORT || exit('db_port'),
    database: process.env.DB_NAME || exit('db_name'),
    password: process.env.DB_PASS || exit('db_pass')
  }
};

module.exports = config;
