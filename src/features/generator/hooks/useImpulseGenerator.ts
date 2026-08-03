import { useReducer, useCallback, useEffect, useRef } from 'react';
import {
  createInitialState,
  generatorReducer,
  type GeneratorState,
  type GeneratorAction,
} from '../state';
import type { ImpulseParams, GeneratedImpulse } from '../core/types';
import { generatePureSpike } from '../core/generatePureSpike';
import { generateNoiseBurst } from '../core/generateNoiseBurst';
import { encodeWav, createFilename } from '../utils/encodeWav';
import { downloadBlob } from '../utils/downloadBlob';

export interface UseImpulseGeneratorReturn {
  state: GeneratorState;
  dispatch: React.Dispatch<GeneratorAction>;
  generate: () => void;
  download: () => void;
}

/**
 * Main orchestrating hook for the Impulse Generator.
 * Owns state, generation, live preview and download.
 */
export function useImpulseGenerator(): UseImpulseGeneratorReturn {
  const [state, dispatch] = useReducer(
    generatorReducer,
    undefined,
    createInitialState
  );

  // Keep a ref to the latest params so the debounced function always sees fresh values
  const paramsRef = useRef(state.params);
  paramsRef.current = state.params;

  // ----------------------------------------------------------
  // Core generation
  // ----------------------------------------------------------
  const runGeneration = useCallback((params: ImpulseParams): GeneratedImpulse => {
    if (params.impulseType === 'pure') {
      return generatePureSpike(params);
    }
    return generateNoiseBurst(params);
  }, []);

  const generate = useCallback(() => {
    dispatch({ type: 'SET_IS_GENERATING', isGenerating: true });

    // We generate synchronously for now (OfflineAudioContext is not needed
    // because we already build the Float32Array ourselves).
    // If it ever becomes heavy we can wrap it in requestIdleCallback / worker.
    try {
      const impulse = runGeneration(paramsRef.current);
      dispatch({ type: 'SET_GENERATED', impulse });
    } catch (err) {
      console.error('Generation failed:', err);
      dispatch({ type: 'SET_IS_GENERATING', isGenerating: false });
    }
  }, [runGeneration]);

  // ----------------------------------------------------------
  // Download
  // ----------------------------------------------------------
  const download = useCallback(() => {
    if (!state.generated) return;

    const blob = encodeWav(state.generated);
    const filename = createFilename(
      state.generated,
      state.params.impulseType
    );
    downloadBlob(blob, filename);
  }, [state.generated, state.params.impulseType]);

  // ----------------------------------------------------------
  // Live Preview (debounced)
  // ----------------------------------------------------------
  useEffect(() => {
    if (!state.livePreview) return;

    const timer = window.setTimeout(() => {
      generate();
    }, 220); // ~220 ms debounce – feels responsive but not too heavy

    return () => window.clearTimeout(timer);
  }, [
    state.livePreview,
    state.params, // any param change triggers the effect
    generate,
  ]);

  return {
    state,
    dispatch,
    generate,
    download,
  };
}