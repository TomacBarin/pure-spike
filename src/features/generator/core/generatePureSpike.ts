import type { ImpulseParams, GeneratedImpulse } from './types';
import { clampParams } from './defaults';
import { applyEnvelope } from './applyEnvelope';

/**
 * Generates a pure single-sample impulse (Pure Spike).
 *
 * Behaviour matches the original PureIR:
 * - Exactly one non-zero sample at frame 0
 * - Everything else is silence
 * - Supports mono + stereo with linear balance
 */
export function generatePureSpike(params: ImpulseParams): GeneratedImpulse {
  const safe = clampParams(params);
  const { sampleRate, duration, amplitude, channels, balance } = safe;

  const numberOfChannels = channels === 'mono' ? 1 : 2;
  const frameCount = Math.floor(sampleRate * duration);
  const samples = new Float32Array(frameCount * numberOfChannels);

  // --- Calculate channel gains ---
  let leftGain = amplitude;
  let rightGain = amplitude;

  if (numberOfChannels === 2) {
    // Linear balance (-1 = full left, 0 = center, 1 = full right)
    leftGain = amplitude * (balance <= 0 ? 1 : 1 - balance);
    rightGain = amplitude * (balance >= 0 ? 1 : 1 + balance);
  }

  // --- Place the impulse at the very first frame ---
  if (numberOfChannels === 1) {
    samples[0] = leftGain;
  } else {
    // Interleaved: [L, R, L, R, ...]
    samples[0] = leftGain;
    samples[1] = rightGain;
  }

  // Rest of the buffer is already 0 (Float32Array is zero-filled)

  const impulse: GeneratedImpulse = {
    samples,
    sampleRate,
    numberOfChannels,
    duration,
  };

  return applyEnvelope(impulse, safe.fadeIn, safe.fadeOut);
}