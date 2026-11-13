import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';

/**
 * JWT Authentication Middleware
 * Enforces token verification on administrative / protected routes.
 * Mitigates Broken Object Level Authorization (BOLA/IDOR).
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new AppError('Authentication failed: Missing or malformed Bearer token.', 401)
    );
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Authentication token not provided.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again.', 401));
    }
    return next(new AppError('Invalid authentication credentials.', 403));
  }
};
