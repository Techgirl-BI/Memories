
import Joi from 'joi';

// Joi schema for post validation
const postSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  image: Joi.array().items(Joi.string()),
  videos: Joi.array().items(Joi.string()),
  // userId: Joi.string().required(), 
  
});

export default postSchema;
