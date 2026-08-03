import { Select } from '../../../components/ui/Select/Select';
import { Slider } from '../../../components/ui/Slider/Slider';
import type { ImpulseParams } from '../core/types';
import { SAMPLE_RATE_OPTIONS, CHANNELS_OPTIONS, CONSTRAINTS } from '../core/types';
import type { GeneratorAction } from '../state';
import styles from '../GeneratorPanel.module.css';

interface Props {
  params: ImpulseParams;
  dispatch: React.Dispatch<GeneratorAction>;
}

export function ParameterControls({ params, dispatch }: Props) {
  return (
    <>
      <div className={styles.paramsGrid}>
        <div className={styles.paramGroup}>
          <h3 className={styles.paramGroupTitle}>Time & Format</h3>

          <Select
            label="Sample Rate"
            value={params.sampleRate}
            options={[...SAMPLE_RATE_OPTIONS]}
            onChange={(v) => dispatch({ type: 'SET_SAMPLE_RATE', sampleRate: v as ImpulseParams['sampleRate'] })}
          />

          <Slider
            label="Duration (s)"
            value={params.duration}
            min={CONSTRAINTS.duration.min}
            max={CONSTRAINTS.duration.max}
            step={0.01}
            onChange={(v) => dispatch({ type: 'SET_DURATION', duration: v })}
          />
        </div>

        <div className={styles.paramGroup}>
          <h3 className={styles.paramGroupTitle}>Level & Stereo</h3>

          <Slider
            label="Amplitude"
            value={params.amplitude}
            min={CONSTRAINTS.amplitude.min}
            max={CONSTRAINTS.amplitude.max}
            step={0.01}
            onChange={(v) => dispatch({ type: 'SET_AMPLITUDE', amplitude: v })}
          />

          <Select
            label="Channels"
            value={params.channels}
            options={[...CHANNELS_OPTIONS]}
            onChange={(v) => dispatch({ type: 'SET_CHANNELS', channels: v as ImpulseParams['channels'] })}
          />

          <Slider
            label="Balance"
            value={params.balance}
            min={CONSTRAINTS.balance.min}
            max={CONSTRAINTS.balance.max}
            step={0.01}
            onChange={(v) => dispatch({ type: 'SET_BALANCE', balance: v })}
          />
        </div>
      </div>

      <div className={styles.envelopeGroup}>
        <h3 className={styles.paramGroupTitle}>Envelope</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Slider
            label="Fade In (s)"
            value={params.fadeIn}
            min={0}
            max={params.duration}
            step={0.001}
            onChange={(v) => dispatch({ type: 'SET_FADE_IN', fadeIn: v })}
          />
          <Slider
            label="Fade Out (s)"
            value={params.fadeOut}
            min={0}
            max={params.duration}
            step={0.001}
            onChange={(v) => dispatch({ type: 'SET_FADE_OUT', fadeOut: v })}
          />
        </div>
      </div>
    </>
  );
}