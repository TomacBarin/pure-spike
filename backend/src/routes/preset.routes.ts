import { Router } from 'express';
import { PresetController } from '../controllers/preset.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { createPresetSchema, updatePresetSchema } from '../types/preset.schemas.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(PresetController.findAll));

router.post(
  '/',
  validateBody(createPresetSchema),
  asyncHandler(PresetController.create)
);

router.get('/export', asyncHandler(PresetController.exportAll));

router.get('/:id', asyncHandler(PresetController.findById));

router.patch(
  '/:id',
  validateBody(updatePresetSchema),
  asyncHandler(PresetController.update)
);

router.delete('/:id', asyncHandler(PresetController.delete));

router.post('/:id/use', asyncHandler(PresetController.markAsUsed));

export default router;