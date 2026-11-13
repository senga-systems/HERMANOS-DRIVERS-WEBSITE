/**
 * Custom Operational Application Error class.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Express Error Handling Middleware.
 * Enforces Cybersecurity best practice: never leak stack traces or internal
 * database/ORM details to client responses in production.
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const isDev = process.env.NODE_ENV !== 'production';

  // Log error internally for auditing
  console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  console.error(err);

  // Prisma unique constraint violation (P2002)
  if (err.code === 'P2002') {
    return res.status(409).json({
      status: 'fail',
      message: 'A record with this unique value already exists.',
    });
  }

  // Response payload
  const responsePayload = {
    status: err.status,
    message: err.message || 'An unexpected internal server error occurred.',
  };

  if (err.details) {
    responsePayload.details = err.details;
  }

  // Only attach stack trace in development
  if (isDev) {
    responsePayload.stack = err.stack;
  }

  return res.status(err.statusCode).json(responsePayload);
};
