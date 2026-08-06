import { Preset } from '../models/Preset.js';
import { AppError } from '../utils/errors.js';
import type { CreatePresetInput, UpdatePresetInput } from '../types/preset.schemas.js';
import type { Types } from 'mongoose';

export class PresetService {
  static async create(userId: string, input: CreatePresetInput) {
    const preset = await Preset.create({
      userId,
      ...input,
    });

    return preset;
  }

  static async findAllByUser(
    userId: string,
    options: { search?: string; tag?: string } = {}
  ) {
    const filter: Record<string, unknown> = { userId };

    if (options.search) {
      filter.name = { $regex: options.search, $options: 'i' };
    }

    if (options.tag) {
      filter.tags = options.tag;
    }

    const presets = await Preset.find(filter).sort({ updatedAt: -1 });
    return presets;
  }

  static async findById(userId: string, presetId: string) {
    const preset = await Preset.findOne({ _id: presetId, userId });

    if (!preset) {
      throw new AppError(404, 'PRESET_NOT_FOUND', 'Preset not found');
    }

    return preset;
  }

  static async update(userId: string, presetId: string, input: UpdatePresetInput) {
    const preset = await Preset.findOneAndUpdate(
      { _id: presetId, userId },
      { $set: input },
      { new: true, runValidators: true }
    );

    if (!preset) {
      throw new AppError(404, 'PRESET_NOT_FOUND', 'Preset not found');
    }

    return preset;
  }

  static async delete(userId: string, presetId: string) {
    const preset = await Preset.findOneAndDelete({ _id: presetId, userId });

    if (!preset) {
      throw new AppError(404, 'PRESET_NOT_FOUND', 'Preset not found');
    }

    return preset;
  }

  /** Mark a preset as used (increments usageCount + updates lastUsedAt) */
  static async markAsUsed(userId: string, presetId: string) {
    const preset = await Preset.findOneAndUpdate(
      { _id: presetId, userId },
      {
        $inc: { usageCount: 1 },
        $set: { lastUsedAt: new Date() },
      },
      { new: true }
    );

    if (!preset) {
      throw new AppError(404, 'PRESET_NOT_FOUND', 'Preset not found');
    }

    return preset;
  }

  static async exportAll(userId: string) {
    const presets = await Preset.find({ userId }).sort({ name: 1 });
    return presets;
  }

  /** Used later when deleting an account */
  static async deleteAllByUser(userId: string | Types.ObjectId) {
    await Preset.deleteMany({ userId });
  }
}