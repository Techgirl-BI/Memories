
import Joi from 'joi';

// Joi schema for post validation
const postSchema = Joi.object({
  content: Joi.string().required(),
  userId: Joi.string().required(), 
});

export default postSchema;
