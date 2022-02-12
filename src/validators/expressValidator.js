const { unprocessableEntity } = require('../statusCode');

const joiValidator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    console.log('error', message);
    res.status(unprocessableEntity).json({ error: message });
  }
};

module.exports = joiValidator;
