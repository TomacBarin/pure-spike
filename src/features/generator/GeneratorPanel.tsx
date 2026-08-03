import { Card } from '../../components/ui/Card/Card';
import { ImpulseTypeSelector } from './components/ImpulseTypeSelector';
import { ParameterControls } from './components/ParameterControls';
import { ActionBar } from './components/ActionBar';
import { WaveformCanvas } from './components/WaveformCanvas';
import { useImpulseGenerator } from './hooks/useImpulseGenerator';
import styles from './GeneratorPanel.module.css';
import { Button } from '../../components/ui/Button/Button';

function GeneratorPanel() {
  const { state, dispatch, generate, download } = useImpulseGenerator();

  return (
    <section
      id="generator"
      className={styles.section}
      aria-labelledby="generator-heading"
    >
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
              onChange={(type) =>
                dispatch({ type: 'SET_IMPULSE_TYPE', impulseType: type })
              }
            />
            <Button
              variant={state.livePreview ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'TOGGLE_LIVE_PREVIEW' })}
            >
              {state.livePreview ? 'Live Preview: ON' : 'Live Preview: OFF'}
            </Button>
          </div>

          <WaveformCanvas impulse={state.generated} />

          <ParameterControls params={state.params} dispatch={dispatch} />

          <ActionBar
            onReset={() => dispatch({ type: 'RESET' })}
            onGenerate={generate}
            onDownload={download}
            canDownload={state.generated !== null}
            isGenerating={state.isGenerating}
          />
        </Card>
      </div>
    </section>
  );
}

export default GeneratorPanel;