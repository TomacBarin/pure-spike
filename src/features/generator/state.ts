import type { ImpulseParams, ImpulseType, GeneratedImpulse } from './core/types';
import { getDefaults, createParams } from './core/defaults';

// ------------------------------------------------------------
// State
// ------------------------------------------------------------

export interface GeneratorState {
  /** Current parameter values */
  params: ImpulseParams;
  /** Whether live preview mode is enabled */
  livePreview: boolean;
  /** The last generated impulse (null until first generation) */
  generated: GeneratedImpulse | null;
  /** Simple flag – useful later for loading states */
  isGenerating: boolean;
}

// ------------------------------------------------------------
// Actions (discriminated union)
// ------------------------------------------------------------

export type GeneratorAction =
  | { type: 'SET_IMPULSE_TYPE'; impulseType: ImpulseType }
  | { type: 'SET_SAMPLE_RATE'; sampleRate: ImpulseParams['sampleRate'] }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'SET_AMPLITUDE'; amplitude: number }
  | { type: 'SET_CHANNELS'; channels: ImpulseParams['channels'] }
  | { type: 'SET_BALANCE'; balance: number }
  | { type: 'SET_FADE_IN'; fadeIn: number }
  | { type: 'SET_FADE_OUT'; fadeOut: number }
  | { type: 'RESET' }
  | { type: 'TOGGLE_LIVE_PREVIEW' }
  | { type: 'SET_GENERATED'; impulse: GeneratedImpulse | null }
  | { type: 'SET_IS_GENERATING'; isGenerating: boolean };

// ------------------------------------------------------------
// Initial state
// ------------------------------------------------------------

export function createInitialState(): GeneratorState {
  return {
    params: getDefaults('pure'),
    livePreview: false,
    generated: null,
    isGenerating: false,
  };
}

// ------------------------------------------------------------
// Reducer
// ------------------------------------------------------------

export function generatorReducer(
  state: GeneratorState,
  action: GeneratorAction
): GeneratorState {
  switch (action.type) {
    case 'SET_IMPULSE_TYPE': {
      // When switching type we load the sensible defaults for that type
      // (but we keep the user's sampleRate if we want – for now we use full defaults)
      const newParams = getDefaults(action.impulseType);
      return {
        ...state,
        params: newParams,
        generated: null, // force re-generation
      };
    }

    case 'SET_SAMPLE_RATE':
      return {
        ...state,
        params: createParams(state.params, { sampleRate: action.sampleRate }),
      };

    case 'SET_DURATION':
      return {
        ...state,
        params: createParams(state.params, { duration: action.duration }),
      };

    case 'SET_AMPLITUDE':
      return {
        ...state,
        params: createParams(state.params, { amplitude: action.amplitude }),
      };

    case 'SET_CHANNELS': {
      const nextChannels = action.channels;
      const updates: Partial<ImpulseParams> = {
        channels: nextChannels,
      };

      // When switching to mono, reset balance to center
      if (nextChannels === 'mono') {
        updates.balance = 0;
      }

      return {
        ...state,
        params: createParams(state.params, updates),
      };
    }

    case 'SET_BALANCE':
      return {
        ...state,
        params: createParams(state.params, { balance: action.balance }),
      };

    case 'SET_FADE_IN':
      return {
        ...state,
        params: createParams(state.params, { fadeIn: action.fadeIn }),
      };

    case 'SET_FADE_OUT':
      return {
        ...state,
        params: createParams(state.params, { fadeOut: action.fadeOut }),
      };

    case 'RESET':
      return {
        ...state,
        params: getDefaults(state.params.impulseType),
        generated: null,
      };

    case 'TOGGLE_LIVE_PREVIEW':
      return {
        ...state,
        livePreview: !state.livePreview,
      };

    case 'SET_GENERATED':
      return {
        ...state,
        generated: action.impulse,
        isGenerating: false,
      };

    case 'SET_IS_GENERATING':
      return {
        ...state,
        isGenerating: action.isGenerating,
      };

    default: {
      // Exhaustiveness check – TypeScript will error if we miss a case
      const _exhaustive: never = action;
      return state;
    }
  }
}