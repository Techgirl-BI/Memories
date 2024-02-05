// auth.js

import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: 'error',
      message: 'Access denied. No token provided.',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object for further use in the route handler
    req.user = decoded.user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(httpStatus.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid token.',
    });
  }
};

export default authMiddleware;
