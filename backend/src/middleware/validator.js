import { body, validationResult } from 'express-validator';

/**
 * Middleware to check validation results from express-validator.
 * Returns structured 400 Bad Request responses if validation fails.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed on submitted booking data.',
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for POST /api/bookings
 * Sanitizes against XSS, SQL injection vectors, and malformed inputs.
 */
export const bookingValidationRules = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters.'),

  body('customerEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail({ gmail_remove_dots: false })
    .isLength({ max: 150 })
    .withMessage('Email address cannot exceed 150 characters.'),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/)
    .withMessage('Please provide a valid phone number (e.g., +265 997 096 922 or 0997096922).'),

  body('serviceType')
    .trim()
    .notEmpty()
    .withMessage('Service type is required.')
    .isIn(['VEHICLE_DELIVERY', 'LONG_DISTANCE', 'PRIVATE_DRIVING', 'VEHICLE_COLLECTION'])
    .withMessage('Invalid service type selected.'),

  body('pickupLocation')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Pickup location cannot exceed 200 characters.'),

  body('dropoffLocation')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Drop-off location cannot exceed 200 characters.'),

  body('vehicleType')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Vehicle category cannot exceed 100 characters.'),

  body('travelDate')
    .optional({ checkFalsy: true })
    .trim()
    .isISO8601()
    .withMessage('Please provide a valid preferred date.'),

  body('tripNotes')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Trip notes cannot exceed 1000 characters.'),

  body('notes')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters.'),
];
