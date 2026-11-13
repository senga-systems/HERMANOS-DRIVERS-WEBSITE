import prisma from '../config/db.js';
import { AppError } from '../utils/errorHandler.js';

/**
 * Service Layer: Booking Logic & DB Operations
 * Uses Prisma ORM with parameterized queries to eliminate SQL Injection risks.
 */

export const createBookingService = async (bookingData) => {
  const { customerName, phoneNumber, serviceType, pickupLocation, dropoffLocation, notes } = bookingData;

  const newBooking = await prisma.booking.create({
    data: {
      customerName,
      phoneNumber,
      serviceType,
      pickupLocation: pickupLocation || null,
      dropoffLocation: dropoffLocation || null,
      notes: notes || null,
      status: 'PENDING',
    },
  });

  return newBooking;
};

export const getAllBookingsService = async ({ status, limit = 50, page = 1 }) => {
  const take = Math.min(Number(limit) || 50, 100);
  const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

  const whereClause = status ? { status } : {};

  const [bookings, totalCount] = await Promise.all([
    prisma.booking.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    }),
    prisma.booking.count({ where: whereClause }),
  ]);

  return {
    bookings,
    pagination: {
      total: totalCount,
      page: Number(page) || 1,
      limit: take,
      totalPages: Math.ceil(totalCount / take),
    },
  };
};

export const getBookingByIdService = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new AppError(`Booking with ID ${id} not found.`, 404);
  }

  return booking;
};

export const updateBookingStatusService = async (id, status) => {
  const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  if (!validStatuses.includes(status)) {
    throw new AppError(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`, 400);
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return updated;
};
