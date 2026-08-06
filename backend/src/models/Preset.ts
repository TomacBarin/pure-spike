import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const parametersSchema = new Schema(
  {
    sampleRate: { type: Number, required: true, enum: [44100, 48000, 96000] },
    duration: { type: Number, required: true },
    amplitude: { type: Number, required: true },
    channels: { type: String, required: true, enum: ['mono', 'stereo'] },
    balance: { type: Number, required: true, default: 0 },
    fadeIn: { type: Number, required: true, default: 0 },
    fadeOut: { type: Number, required: true, default: 0 },
  },
  { _id: false } 
);

const presetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    impulseType: {
      type: String,
      required: true,
      enum: ['pure', 'noise'],
    },
    parameters: {
      type: parametersSchema,
      required: true,
    },
    lastUsedAt: {
      type: Date,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

presetSchema.index({ userId: 1, updatedAt: -1 });
presetSchema.index({ userId: 1, tags: 1 });

export type PresetDocument = InferSchemaType<typeof presetSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Preset = mongoose.model('Preset', presetSchema);