import { Button } from '../../../components/ui/Button/Button';
import styles from '../GeneratorPanel.module.css';

interface Props {
  onReset: () => void;
  onGenerate: () => void;
  onDownload: () => void;
  canDownload: boolean;
  isGenerating?: boolean;
  isAuthenticated?: boolean;
  onSavePreset?: () => void;
  onOpenPresets?: () => void;
}

export function ActionBar({
  onReset,
  onGenerate,
  onDownload,
  canDownload,
  isGenerating = false,
  isAuthenticated = false,
  onSavePreset,
  onOpenPresets,
}: Props) {
  return (
    <div className={styles.actionBar}>
      <div className={styles.actionBarLeft}>
        <Button variant="ghost" size="md" onClick={onReset}>
          Reset to Defaults
        </Button>

        {isAuthenticated && (
          <>
            <Button variant="ghost" size="md" onClick={onSavePreset}>
              Save Preset
            </Button>
            <Button variant="ghost" size="md" onClick={onOpenPresets}>
              My Presets
            </Button>
          </>
        )}
      </div>

      <div className={styles.actionButtons}>
        <Button variant="secondary" size="md" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? 'Generating…' : 'Generate Preview'}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={onDownload}
          disabled={!canDownload || isGenerating}
        >
          Download WAV
        </Button>
      </div>
    </div>
  );
}