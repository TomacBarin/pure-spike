import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../types/auth.schemas.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(AuthController.register)
);

router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(AuthController.login)
);

router.post(
  '/refresh',
  asyncHandler(AuthController.refresh)
);

router.post(
  '/logout',
  asyncHandler(AuthController.logout)
);

router.get('/me', requireAuth, asyncHandler(AuthController.me));

export default router;