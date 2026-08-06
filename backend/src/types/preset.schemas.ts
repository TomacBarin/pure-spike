import { z } from 'zod';

const parametersSchema = z.object({
  sampleRate: z.union([z.literal(44100), z.literal(48000), z.literal(96000)]),
  duration: z.number().min(0.01).max(5),
  amplitude: z.number().min(-1).max(1),
  channels: z.enum(['mono', 'stereo']),
  balance: z.number().min(-1).max(1).default(0),
  fadeIn: z.number().min(0).default(0),
  fadeOut: z.number().min(0).default(0),
});

export const createPresetSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  description: z.string().max(500).trim().optional().default(''),
  tags: z.array(z.string().trim().min(1)).max(10).optional().default([]),
  impulseType: z.enum(['pure', 'noise']),
  parameters: parametersSchema,
});

export const updatePresetSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  description: z.string().max(500).trim().optional(),
  tags: z.array(z.string().trim().min(1)).max(10).optional(),
  
});

export type CreatePresetInput = z.infer<typeof createPresetSchema>;
export type UpdatePresetInput = z.infer<typeof updatePresetSchema>;