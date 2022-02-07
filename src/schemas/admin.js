const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  surname: Joi.string()
    .min(3)
    .max(30)
    .required(),
  patronymic:
    Joi.string()
      .min(3)
      .max(30)
      .required(),
  email: Joi.string().email().max(128).lowercase().required(),
  password: Joi.string().min(8).max(32).required().strict(),
});

const userIdSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});


module.exports = {
  userSchema,
  userIdSchema
};
