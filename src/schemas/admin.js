const Joi=require('joi');

const createUserSchema = Joi.object({
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

module.exports={createUserSchema};