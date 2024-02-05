// validation.js
import {userSchema} from "../Controllers/user/userSchema.js"
import httpStatus from 'http-status';

const validateMiddleware = (schema) => (req, res, next) => {
  const data = req.body;

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);

    return res.status(httpStatus.BAD_REQUEST).json({
      status: 'error',
      message: 'Validation error',
      errors: validationErrors,
    });
  }

  next();
};

// Example usage:

// Use the validateMiddleware with the specified schema
const validateUser = validateMiddleware(userSchema);

export { validateUser };
