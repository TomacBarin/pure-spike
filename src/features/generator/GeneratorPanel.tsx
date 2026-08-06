import { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { ImpulseTypeSelector } from './components/ImpulseTypeSelector';
import { ParameterControls } from './components/ParameterControls';
import { ActionBar } from './components/ActionBar';
import { WaveformCanvas } from './components/WaveformCanvas';
import { useImpulseGenerator } from './hooks/useImpulseGenerator';
import { usePresets } from '../presets/hooks/usePresets';
import { SavePresetModal } from '../presets/components/SavePresetModal';
import { PresetsDrawer } from '../presets/components/PresetsDrawer';
import { Button } from '../../components/ui/Button/Button';
import styles from './GeneratorPanel.module.css';

function GeneratorPanel() {
  const { state, dispatch, generate, download } = useImpulseGenerator();
  const {
    presets,
    isLoading,
    error,
    isAuthenticated,
    fetchPresets,
    createPreset,
    deletePreset,
    markAsUsed,
    exportAll,
  } = usePresets();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPresetsDrawer, setShowPresetsDrawer] = useState(false);

  return (
    <section
      id="generator"
      className={styles.section}
      aria-labelledby="Impulse Generator"
    >
      <div className={styles.container}>
        <Card padding="lg" className={styles.panel}>
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
              <span className={styles.liveLabelFull}>
                {state.livePreview ? 'Live Preview: ON' : 'Live Preview: OFF'}
              </span>
              <span className={styles.liveLabelShort}>
                {state.livePreview ? 'Live: ON' : 'Live: OFF'}
              </span>
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
            isAuthenticated={isAuthenticated}
            onSavePreset={() => setShowSaveModal(true)}
            onOpenPresets={() => setShowPresetsDrawer(true)}
          />
        </Card>
      </div>

      {showSaveModal && (
        <SavePresetModal
          params={state.params}
          onSave={createPreset}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {showPresetsDrawer && (
        <PresetsDrawer
          presets={presets}
          isLoading={isLoading}
          error={error}
          onClose={() => setShowPresetsDrawer(false)}
          onLoad={(params) => dispatch({ type: 'LOAD_PRESET', params })}
          onDelete={deletePreset}
          onExport={exportAll}
          onRefresh={(search) => fetchPresets({ search })}
          onMarkUsed={markAsUsed}
        />
      )}
    </section>
  );
}

export default GeneratorPanel;