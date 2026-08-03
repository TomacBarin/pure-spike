import type { GeneratedImpulse } from '../core/types';

/**
 * Encodes a GeneratedImpulse into a 32-bit float WAV Blob.
 *
 * Format details:
 * - PCM IEEE float (AudioFormat = 3)
 * - 32 bits per sample
 * - Interleaved channels
 * - Little-endian
 */
export function encodeWav(impulse: GeneratedImpulse): Blob {
  const { samples, sampleRate, numberOfChannels } = impulse;

  const bytesPerSample = 4; // 32-bit float
  const blockAlign = numberOfChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;

  // Total file size = 44 byte header + data
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // --- RIFF header ---
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true); // file size - 8
  writeString(view, 8, 'WAVE');

  // --- fmt chunk ---
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);          // chunk size (16 for PCM/float)
  view.setUint16(20, 3, true);           // AudioFormat = 3 (IEEE float)
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 32, true);          // bits per sample

  // --- data chunk ---
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write the actual samples (little-endian float32)
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    view.setFloat32(offset, samples[i], true);
    offset += 4;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

/** Helper: write a 4-character ASCII string into the DataView */
function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

/**
 * Creates a descriptive filename from the impulse parameters.
 * Example: pure-spike_48kHz_1.50s_mono.wav
 */
export function createFilename(impulse: GeneratedImpulse, impulseType: 'pure' | 'noise'): string {
  const typeLabel = impulseType === 'pure' ? 'pure-spike' : 'noise-burst';
  const rateLabel = `${impulse.sampleRate / 1000}kHz`;
  const durationLabel = `${impulse.duration.toFixed(2)}s`;
  const channelLabel = impulse.numberOfChannels === 1 ? 'mono' : 'stereo';

  return `${typeLabel}_${rateLabel}_${durationLabel}_${channelLabel}.wav`;
}