import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingStatusService,
} from '../services/bookingService.js';
import { sendQuoteRequestEmail } from '../services/emailService.js';

/**
 * Controller: Handles incoming HTTP requests for bookings
 */

export const createBooking = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.body);
    const emailStatus = await sendQuoteRequestEmail({
      ...booking,
      vehicleType: req.body.vehicleType,
      travelDate: req.body.travelDate,
      tripNotes: req.body.tripNotes,
    });

    return res.status(201).json({
      status: 'success',
      message: emailStatus.sent
        ? 'Booking and quote request emailed to Hermanos Drivers successfully!'
        : 'Booking request received successfully! A Hermanos representative will contact you shortly.',
      data: {
        booking,
        emailStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { status, limit, page } = req.query;
    const result = await getAllBookingsService({ status, limit, page });

    return res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingByIdService(id);

    return res.status(200).json({
      status: 'success',
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await updateBookingStatusService(id, status);

    return res.status(200).json({
      status: 'success',
      message: `Booking status updated to ${status}.`,
      data: { booking: updated },
    });
  } catch (error) {
    next(error);
  }
};
