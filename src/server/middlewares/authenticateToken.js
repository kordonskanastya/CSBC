const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config');

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  // eslint-disable-next-line consistent-return
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.log(err.message || err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
