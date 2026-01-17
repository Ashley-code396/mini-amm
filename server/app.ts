// app.ts
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import indexRouter from './routes/index';
// import usersRouter from './routes/users';

import { startPoolEventCron } from './crons/poolEventCron';
import { prisma } from './prisma/prismaClient';

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// --- Start cron jobs after app is initialized ---
startPoolEventCron()
  .then(() => console.log('Pool Event Cron started'))
  .catch((err) => console.error('Failed to start Pool Event Cron:', err));

// Optional: test Prisma connection on startup
prisma.$connect()
  .then(() => console.log('Connected to database via Prisma'))
  .catch((err) => console.error('Prisma connection error:', err));

export default app;
