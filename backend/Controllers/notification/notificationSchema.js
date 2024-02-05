import Joi from 'joi'
const notificationSchema = Joi.object({
    message: Joi.string().required(),
    userId: Joi.string().required(),
  });