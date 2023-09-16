import Joi from 'joi';

export const User = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


