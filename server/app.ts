import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { FRONTEND_URL } from './config';

// Import routes
import poolsRouter from './routes/pools';
import userTransactionsRouter from './routes/transactions';


// Import cron job
import { startPoolEventCron } from './crons/poolEventCron';
import { prisma } from './prisma/prismaClient';

const app = express();

// --- CORS Configuration ---
const corsOptions = {
  origin: FRONTEND_URL || 'http://localhost:3000', // fallback frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // allow cookies/auth headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// --- Middleware ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---
app.use('/api/pools', poolsRouter);
app.use('/api/transactions', userTransactionsRouter);


// --- 404 handler ---
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// --- Error handler ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

// --- Start cron jobs after app is initialized ---
startPoolEventCron()
  .then(() => console.log('Pool Event Cron started'))
  .catch((err) => console.error('Failed to start Pool Event Cron:', err));

// --- Optional: test Prisma connection on startup ---
prisma.$connect()
  .then(() => console.log('Connected to database via Prisma'))
  .catch((err) => console.error('Prisma connection error:', err));

export default app;
