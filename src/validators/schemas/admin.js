const Joi = require('joi');
const roles = require('../../config/roles');

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
    .valid(roles[1], roles[2], roles[3], roles[4])
    .insensitive()
    .required(),
});

const IdSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});

const coursesSchema = Joi.object({
  lecturerId:Joi.number().min(1).positive().required(),
  credits:Joi.number().min(1).max(60).required(),
  name:Joi.string().min(3).max(128).required()
});

const groupSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  curatorId: Joi.number().min(1).positive().required(),
  entryYear:
    Joi.date().greater('2000-01-01').less('3001-01-01').iso().required(),
  graduationYear:
    Joi.date().greater('2000-01-01').less('3001-01-01').iso().required(),
  fkSpecialityId: Joi.number().min(1).max(15).required(),
});
const specialitySchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  code: Joi.string().min(3).max(3).required()
});

const studentSchema = Joi.object({
  edeboId: Joi.number().min(1000000).max(9999999).positive().required(),
  groupId: Joi.number().min(1).positive().required(),
  userId: Joi.number().min(1).positive().required(),
});

const studentSchema = Joi.object({
  edeboId: Joi.number().min(1000000).max(9999999).positive().required(),
  groupId: Joi.number().min(1).positive().required(),
  userId: Joi.number().min(1).positive().required(),
});

module.exports = {
  userSchema,
  IdSchema,
  coursesSchema,
  groupSchema,
  studentSchema,
  specialitySchema,
  studentSchema
};
