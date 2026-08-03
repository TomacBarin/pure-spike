import { Button } from '../../../components/ui/Button/Button';

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
    <div className="actionBar"> 
      <Button variant="ghost" size="md" onClick={onReset}>
        Reset to Defaults
      </Button>

      <div style={{ display: 'flex', gap: '12px' }}>
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