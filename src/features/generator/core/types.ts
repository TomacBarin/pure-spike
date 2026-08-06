/** Impulse type – only two variants in MVP */
export type ImpulseType = 'pure' | 'noise';

/** Supported professional sample rates */
export type SampleRate = 44100 | 48000 | 96000;

/** Mono or stereo output */
export type Channels = 'mono' | 'stereo';


export interface ImpulseParams {
  impulseType: ImpulseType;
  sampleRate: SampleRate;
  /** Duration in seconds (0.01 – 5.0) */
  duration: number;
  /** Amplitude from -1.0 to 1.0 (negative = polarity invert) */
  amplitude: number;
  channels: Channels;
  /** Stereo balance: -1 = full left, 0 = center, 1 = full right */
  balance: number;
  /** Fade-in time in seconds (0 – duration) */
  fadeIn: number;
  /** Fade-out time in seconds (0 – duration) */
  fadeOut: number;
}

/**
 What the generator function returns.
 */
export interface GeneratedImpulse {
  /** Interleaved samples (LRLR... for stereo, or just mono samples) */
  samples: Float32Array;
  sampleRate: SampleRate;
  numberOfChannels: 1 | 2;
  /** Total length in seconds (should match params.duration after clamping) */
  duration: number;
}

/** Options for the Impulse Type selector */
export const IMPULSE_TYPE_OPTIONS = [
  { value: 'pure' as const, label: 'Pure Spike' },
  { value: 'noise' as const, label: 'Noise Burst' },
] as const;

/** Options for the Sample Rate selector */
export const SAMPLE_RATE_OPTIONS = [
  { value: 44100 as const, label: '44.1 kHz' },
  { value: 48000 as const, label: '48 kHz' },
  { value: 96000 as const, label: '96 kHz' },
] as const;

/** Options for the Channels selector */
export const CHANNELS_OPTIONS = [
  { value: 'mono' as const, label: 'Mono' },
  { value: 'stereo' as const, label: 'Stereo' },
] as const;

/** Soft limits used for clamping and UI validation */
export const CONSTRAINTS = {
  duration: { min: 0.01, max: 5.0 },
  amplitude: { min: -1.0, max: 1.0 },
  balance: { min: -1.0, max: 1.0 },
  fade: { min: 0 }, // max is always = duration
} as const;