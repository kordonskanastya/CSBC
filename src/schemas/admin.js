const Joi = require('joi');

const createUserSchema = Joi.object({
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
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required().strict(),
});

const updateUserSchema = Joi.object({
  id: Joi.number().min(1).positive(),
  username:Joi.string()
    .min(3)
    .max(30)
    .required(),
  surname:Joi.string()
    .min(3)
    .max(30)
    .required(),
  patronymic:
    Joi.string()
      .min(3)
      .max(30)
      .required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required().strict(),
});

const validateIdUserSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});


module.exports = {
  createUserSchema,
  updateUserSchema,
  validateIdUserSchema
};