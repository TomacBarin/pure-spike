import { Button } from '../../../components/ui/Button/Button';
import styles from '../GeneratorPanel.module.css';

interface Props {
  onReset: () => void;
  onGenerate: () => void;
  onDownload: () => void;
  canDownload: boolean;
  isGenerating?: boolean;
}

export function ActionBar({
  onReset,
  onGenerate,
  onDownload,
  canDownload,
  isGenerating = false,
}: Props) {
  return (
    <div className={styles.actionBar}>
      <Button variant="ghost" size="md" onClick={onReset}>
        Reset to Defaults
      </Button>

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