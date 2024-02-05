import Joi from 'joi'
const commentSchema = Joi.object({
    content: Joi.string().required(),
    postId: Joi.string().required(),
    userId: Joi.string().required(),
  })