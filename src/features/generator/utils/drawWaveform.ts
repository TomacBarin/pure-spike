/**
 * Draws a simple amplitude waveform onto a 2D canvas context.
 *
 * @param ctx          – CanvasRenderingContext2D
 * @param samples      – Interleaved Float32Array (mono or stereo)
 * @param numberOfChannels – 1 or 2
 * @param width        – CSS pixel width of the canvas
 * @param height       – CSS pixel height of the canvas
 * @param color        – Stroke color (defaults to accent)
 */
export function drawWaveform(
  ctx: CanvasRenderingContext2D,
  samples: Float32Array,
  numberOfChannels: 1 | 2,
  width: number,
  height: number,
  color: string = '#2dd4bf'
): void {
  const frameCount = samples.length / numberOfChannels;
  if (frameCount === 0) return;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Background is handled by CSS – we only draw the wave

  // Zero line
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(128, 128, 128, 0.35)';
  ctx.lineWidth = 1;
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // Waveform
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';

  const midY = height / 2;
  const ampScale = (height / 2) * 0.9; 

  // For performance we don't draw every single sample when the buffer is huge.
  // We step through the data.
  const step = Math.max(1, Math.floor(frameCount / width));

  for (let x = 0; x < width; x++) {
    const frameIndex = Math.min(frameCount - 1, Math.floor((x / width) * frameCount));

    // Take the first channel (or average for stereo)
    const sampleIndex = frameIndex * numberOfChannels;
    const value = samples[sampleIndex]; // -1 … 1

    const y = midY - value * ampScale;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}