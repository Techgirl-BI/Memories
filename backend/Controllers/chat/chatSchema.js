// chatValidation.js

import Joi from 'joi';

// Joi schema for chat validation
const chatSchema = Joi.object({
  participants: Joi.array()
    .items(Joi.string().required())
    .min(2)
    .unique(),
});

export default chatSchema;
