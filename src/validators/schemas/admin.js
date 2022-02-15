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
  role: Joi.string()
    .valid('student', 'curator', 'teacher', 'admin')
    .insensitive()
    .required(),
});

const IdSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});

const coursesSchema=Joi.object({
  lecturerId:Joi.number().min(1).positive().required(),
  credits:Joi.number().min(1).max(60).required(),
  name:Joi.string().min(3).max(128).required()
});

module.exports = {
  userSchema,
  IdSchema,
  coursesSchema
};
