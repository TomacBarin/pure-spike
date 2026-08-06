import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ZodSchema } from 'zod';
import { AppError } from '../utils/errors.js';

export const validateBody = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(400, 'VALIDATION_ERROR', 'Invalid request body', result.error.flatten())
      );
    }

    req.body = result.data;
    next();
  };
};