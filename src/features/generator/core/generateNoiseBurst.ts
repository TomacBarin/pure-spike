import type { ImpulseParams, GeneratedImpulse } from './types';
import { clampParams } from './defaults';
import { applyEnvelope } from './applyEnvelope';

/**
 * Generates a short burst of white noise shaped by an amplitude envelope.
 *
 * - White noise = random values between -1 and +1
 * - Supports mono + stereo with the same linear balance as Pure Spike
 * - Always applies the fade envelope (important to avoid clicks)
 */
export function generateNoiseBurst(params: ImpulseParams): GeneratedImpulse {
  const safe = clampParams(params);
  const { sampleRate, duration, amplitude, channels, balance, fadeIn, fadeOut } = safe;

  const numberOfChannels = channels === 'mono' ? 1 : 2;
  const frameCount = Math.floor(sampleRate * duration);
  const samples = new Float32Array(frameCount * numberOfChannels);

  // --- Calculate channel gains ---
  let leftGain = amplitude;
  let rightGain = amplitude;

  if (numberOfChannels === 2) {
    leftGain = amplitude * (balance <= 0 ? 1 : 1 - balance);
    rightGain = amplitude * (balance >= 0 ? 1 : 1 + balance);
  }

  // --- Fill with white noise ---
  for (let frame = 0; frame < frameCount; frame++) {
    const offset = frame * numberOfChannels;

    // White noise sample in range [-1, 1]
    const noise = Math.random() * 2 - 1;

    if (numberOfChannels === 1) {
      samples[offset] = noise * leftGain;
    } else {
      samples[offset] = noise * leftGain;     // Left
      samples[offset + 1] = noise * rightGain; // Right
    }
  }

  const impulse: GeneratedImpulse = {
    samples,
    sampleRate,
    numberOfChannels,
    duration,
  };

  // Apply the envelope (this is what makes the burst clean)
  return applyEnvelope(impulse, fadeIn, fadeOut);
}