import Joi from 'joi'

const likeSchema = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
  });