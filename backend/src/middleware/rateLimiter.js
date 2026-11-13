import rateLimit from 'express-rate-limit';

/**
 * Strict Rate Limiter for Booking Submissions.
 * Protects against automated spam, SMS/email spamming triggers, and DoS.
 * Constraint: Max 5 requests per 15 minutes per IP address.
 */
export const bookingRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 booking requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: 429,
  message: {
    status: 'fail',
    message: 'Too many booking requests submitted from this IP address. Please wait 15 minutes before trying again or reach us directly via WhatsApp/Call at +265 997 096 922.',
  },
});

/**
 * General API Rate Limiter
 * Guards the entire API surface against brute-force attacks and volumetric floods.
 */
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests from this client. Please slow down.',
  },
});
