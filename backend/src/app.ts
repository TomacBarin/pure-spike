import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { asyncHandler } from './utils/asyncHandler.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Security & parsing
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health check
app.get(
  '/api/v1/health',
  asyncHandler(async (_req, res) => {
    res.json({
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    });
  })
);

// API routes
app.use('/api/v1/auth', authRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Global error handler 
app.use(errorMiddleware);

export default app;