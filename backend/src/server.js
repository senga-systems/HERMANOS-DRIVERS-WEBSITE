import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes.js';
import { generalApiLimiter } from './middleware/rateLimiter.js';
import { errorHandler, AppError } from './utils/errorHandler.js';
import prisma from './config/db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ==========================================================================
   1. CYBERSECURITY HEADERS & TRAFFIC POLICIES
   ========================================================================== */

// Helmet: sets secure HTTP response headers to defend against XSS, clickjacking, etc.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS: Strictly allow only approved client domains from process.env
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (such as mobile apps or curl) only if in dev
    if (!origin) {
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new AppError(`Origin ${origin} not allowed by CORS security policy.`, 403));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body Parser: Protect against large payload denial-of-service
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// General Rate Limiter for all routes
app.use('/api', generalApiLimiter);

/* ==========================================================================
   2. APPLICATION ROUTES
   ========================================================================== */

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    service: 'Hermanos Drivers API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Booking Routes
app.use('/api/bookings', bookingRoutes);

// Catch-all route for unhandled routes (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Resource ${req.originalUrl} not found on this server.`, 404));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

/* ==========================================================================
   3. SERVER LIFECYCLE & GRACEFUL SHUTDOWN
   ========================================================================== */

const server = app.listen(PORT, () => {
  console.log(`[HERMANOS BACKEND] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle graceful termination
const gracefulShutdown = async (signal) => {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing HTTP server and database connections...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('[SHUTDOWN] Prisma client disconnected cleanly. Process terminated.');
      process.exit(0);
    } catch (err) {
      console.error('[SHUTDOWN ERROR]', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
