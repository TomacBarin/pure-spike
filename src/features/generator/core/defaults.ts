import type { ImpulseParams, ImpulseType, } from './types';
import { CONSTRAINTS } from './types';

/** Default parameters for Pure Spike */
export const PURE_SPIKE_DEFAULTS: ImpulseParams = {
  impulseType: 'pure',
  sampleRate: 48000,
  duration: 1.5,
  amplitude: 1.0,
  channels: 'mono',
  balance: 0,
  fadeIn: 0,
  fadeOut: 0,
};

/** Default parameters for Noise Burst */
export const NOISE_BURST_DEFAULTS: ImpulseParams = {
  impulseType: 'noise',
  sampleRate: 48000,
  duration: 0.1,
  amplitude: 1.0,
  channels: 'mono',
  balance: 0,
  fadeIn: 0.005,   // short fade to avoid clicks
  fadeOut: 0.02,
};

/**
 * Returns the correct default set depending on impulse type.
 */
export function getDefaults(type: ImpulseType): ImpulseParams {
  return type === 'pure' ? { ...PURE_SPIKE_DEFAULTS } : { ...NOISE_BURST_DEFAULTS };
}

/**
 * Clamps a single numeric value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Takes any partial or untrusted params and returns a fully valid ImpulseParams.
 * - Clamps all numeric fields
 * - Makes sure fadeIn + fadeOut never exceed duration
 * - Guarantees we always have a complete, safe object
 */
export function clampParams(params: ImpulseParams): ImpulseParams {
  const duration = clamp(
    params.duration,
    CONSTRAINTS.duration.min,
    CONSTRAINTS.duration.max
  );

  const fadeIn = clamp(params.fadeIn, CONSTRAINTS.fade.min, duration);
  // Make sure fadeOut doesn't push the total fades over duration
  const maxFadeOut = Math.max(0, duration - fadeIn);
  const fadeOut = clamp(params.fadeOut, CONSTRAINTS.fade.min, maxFadeOut);

  return {
    impulseType: params.impulseType,
    sampleRate: params.sampleRate,
    duration,
    amplitude: clamp(params.amplitude, CONSTRAINTS.amplitude.min, CONSTRAINTS.amplitude.max),
    channels: params.channels,
    balance: clamp(params.balance, CONSTRAINTS.balance.min, CONSTRAINTS.balance.max),
    fadeIn,
    fadeOut,
  };
}

/**
 * Convenience: create a complete, clamped params object from a partial update.
 * Useful later when the reducer only receives one changed field.
 */
export function createParams(
  base: ImpulseParams,
  updates: Partial<ImpulseParams>
): ImpulseParams {
  return clampParams({ ...base, ...updates });
}