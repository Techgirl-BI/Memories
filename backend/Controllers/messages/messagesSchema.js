
import Joi from 'joi';

// Joi schema for message validation
const messageSchema = Joi.object({
  content: Joi.string().required(),
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
});
export default messageSchema;
