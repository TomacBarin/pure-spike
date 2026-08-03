import { useRef, useEffect } from 'react';
import type { GeneratedImpulse } from '../core/types';
import { drawWaveform } from '../utils/drawWaveform';
import styles from '../GeneratorPanel.module.css';

interface Props {
  impulse: GeneratedImpulse | null;
}

export function WaveformCanvas({ impulse }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      // Set the internal size accounting for DPR
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the context so we can draw in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (impulse && impulse.samples.length > 0) {
        drawWaveform(
          ctx,
          impulse.samples,
          impulse.numberOfChannels,
          rect.width,
          rect.height
        );
      } else {
        // Empty state – just clear
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    };

    // Initial draw
    draw();

    // Resize observer
    const observer = new ResizeObserver(() => {
      draw();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [impulse]);

  return (
    <div ref={containerRef} className={styles.waveformArea}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {!impulse && (
        <div className={styles.waveformPlaceholder}>
          Waveform preview will appear here
        </div>
      )}
    </div>
  );
}