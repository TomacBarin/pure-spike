import type { GeneratedImpulse } from './types';

/**
 * Applies a linear fade-in and fade-out envelope to an already generated impulse.
 *
 * - Works on interleaved samples (mono or stereo)
 * - fadeIn / fadeOut are given in seconds
 * - The same gain is applied to both channels of each frame
 * - Mutates the samples in place and also returns the same object for convenience
 */
export function applyEnvelope(
  impulse: GeneratedImpulse,
  fadeInSeconds: number,
  fadeOutSeconds: number
): GeneratedImpulse {
  const { samples, sampleRate, numberOfChannels } = impulse;
  const frameCount = samples.length / numberOfChannels;

  const fadeInFrames = Math.min(
    Math.floor(fadeInSeconds * sampleRate),
    frameCount
  );
  const fadeOutFrames = Math.min(
    Math.floor(fadeOutSeconds * sampleRate),
    frameCount
  );

  // Nothing to do
  if (fadeInFrames === 0 && fadeOutFrames === 0) {
    return impulse;
  }

  for (let frame = 0; frame < frameCount; frame++) {
    let gain = 1;

    // Fade-in (start of buffer)
    if (frame < fadeInFrames) {
      gain = fadeInFrames === 0 ? 1 : frame / fadeInFrames;
    }
    // Fade-out (end of buffer)
    else if (frame >= frameCount - fadeOutFrames) {
      const framesIntoFade = frame - (frameCount - fadeOutFrames);
      gain = fadeOutFrames === 0 ? 1 : 1 - framesIntoFade / fadeOutFrames;
    }

    // Apply the same gain to every channel in this frame
    const offset = frame * numberOfChannels;
    for (let ch = 0; ch < numberOfChannels; ch++) {
      samples[offset + ch] *= gain;
    }
  }

  return impulse;
}