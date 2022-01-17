const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    res.status(200).send({ error: false });
  } else {
    res.status(500).send({ error: err.message });
  }
};

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  // eslint-disable-next-line consistent-return
  jwt.verify(token, secretKey, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

module.exports = {
  errorHandler,
  authenticateToken
};
