const statusCode = require('../../statusCode');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res) => {
  if (!err) {
    res.status(statusCode.ok).send({error: false});
  } else {
    res.status(statusCode.serverError).send({error: err.message});
  }
};

module.exports = errorHandler;
