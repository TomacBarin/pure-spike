import { Button } from '../../../components/ui/Button/Button';
import type { ImpulseType } from '../core/types';
import { IMPULSE_TYPE_OPTIONS } from '../core/types';

interface Props {
  value: ImpulseType;
  onChange: (type: ImpulseType) => void;
}

export function ImpulseTypeSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {IMPULSE_TYPE_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}