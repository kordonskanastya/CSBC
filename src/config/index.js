require('dotenv').config();

function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  port: process.env.PORT || 3000,
  secretKey: process.env.TOKEN_SECRET_KEY || exit('secretKey'),
  username: process.env.USER_NAME || exit('username'),
  password: process.env.PASSWORD || exit('password')
};

module.exports = config;
