const Joi = require('joi');

const schemaLogin = Joi.object({
  email: Joi.string().email().lowercase().max(128).required(),
  password: Joi.string().min(8).max(32).required(),
});

const schemaLoginForgotten = Joi.object({
  email: Joi.string().email().lowercase().max(128).required()
});

module.exports = {
  schemaLogin,
  schemaLoginForgotten
};

