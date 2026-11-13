import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { bookingRateLimiter } from '../middleware/rateLimiter.js';
import { bookingValidationRules, validate } from '../middleware/validator.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Submit a driver booking or quote request
 * @access  Public (Rate-limited: 5 requests / 15 mins)
 */
router.post(
  '/',
  bookingRateLimiter,
  bookingValidationRules,
  validate,
  createBooking
);

/**
 * @route   GET /api/bookings
 * @desc    Retrieve all bookings (supports query params: ?status=PENDING&page=1&limit=20)
 * @access  Protected (Requires Bearer JWT token)
 */
router.get(
  '/',
  requireAuth,
  getBookings
);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking details
 * @access  Protected (Requires Bearer JWT token)
 */
router.get(
  '/:id',
  requireAuth,
  getBookingById
);

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Update booking workflow status (CONFIRMED, COMPLETED, CANCELLED)
 * @access  Protected (Requires Bearer JWT token)
 */
router.patch(
  '/:id/status',
  requireAuth,
  updateBookingStatus
);

export default router;
