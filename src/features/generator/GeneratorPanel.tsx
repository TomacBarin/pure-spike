import { useReducer } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { ImpulseTypeSelector } from './components/ImpulseTypeSelector';
import { ParameterControls } from './components/ParameterControls';
import { ActionBar } from './components/ActionBar';
import { createInitialState, generatorReducer } from './state';
import styles from './GeneratorPanel.module.css';

function GeneratorPanel() {
  const [state, dispatch] = useReducer(generatorReducer, undefined, createInitialState);

  const handleGenerate = () => {
    // Placeholder – Real generator will be added
    console.log('Generate with params:', state.params);
  };

  const handleDownload = () => {
    console.log('Download requested');
  };

  return (
    <section id="generator" className={styles.section} aria-labelledby="generator-heading">
      <div className={styles.container}>
        <Card
          title="Impulse Generator"
          titleAs="h2"
          titleId="generator-heading"
          padding="lg"
          className={styles.panel}
        >
          {/* Top bar */}
          <div className={styles.topBar}>
            <ImpulseTypeSelector
              value={state.params.impulseType}
              onChange={(type) => dispatch({ type: 'SET_IMPULSE_TYPE', impulseType: type })}
            />
            {/* Live Preview toggle will be added */}
          </div>

          {/* Waveform placeholder */}
          <div className={styles.waveformArea}>
            Waveform preview will appear here
          </div>

          {/* Parameters */}
          <ParameterControls params={state.params} dispatch={dispatch} />

          {/* Actions */}
          <ActionBar
            onReset={() => dispatch({ type: 'RESET' })}
            onGenerate={handleGenerate}
            onDownload={handleDownload}
            canDownload={false} // true when data has been generated
          />
        </Card>
      </div>
    </section>
  );
}

export default GeneratorPanel;