import type { Request, Response } from 'express';
import { PresetService } from '../services/preset.service.js';
import type { CreatePresetInput, UpdatePresetInput } from '../types/preset.schemas.js';

export class PresetController {
  static async create(req: Request, res: Response) {
    const userId = req.user!.userId;
    const input = req.body as CreatePresetInput;

    const preset = await PresetService.create(userId, input);

    res.status(201).json({
      data: preset,
    });
  }

  static async findAll(req: Request, res: Response) {
    const userId = req.user!.userId;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const tag = typeof req.query.tag === 'string' ? req.query.tag : undefined;

    const presets = await PresetService.findAllByUser(userId, { search, tag });

    res.json({
      data: presets,
      meta: {
        total: presets.length,
      },
    });
  }

  static async findById(req: Request, res: Response) {
    const userId = req.user!.userId;
    const presetId = req.params.id as string;

    const preset = await PresetService.findById(userId, presetId);

    res.json({
      data: preset,
    });
  }

  static async update(req: Request, res: Response) {
    const userId = req.user!.userId;
    const presetId = req.params.id as string;
    const input = req.body as UpdatePresetInput;

    const preset = await PresetService.update(userId, presetId, input);

    res.json({
      data: preset,
    });
  }

  static async delete(req: Request, res: Response) {
    const userId = req.user!.userId;
    const presetId = req.params.id as string;

    await PresetService.delete(userId, presetId);

    res.status(204).send();
  }

  static async markAsUsed(req: Request, res: Response) {
    const userId = req.user!.userId;
    const presetId = req.params.id as string;

    const preset = await PresetService.markAsUsed(userId, presetId);

    res.json({
      data: preset,
    });
  }

  static async exportAll(req: Request, res: Response) {
    const userId = req.user!.userId;
    const presets = await PresetService.exportAll(userId);

    res.json({
      data: presets,
    });
  }
}