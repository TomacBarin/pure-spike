import { useEffect, useState } from 'react';
import type { Preset } from '../../../api/presets';
import type { ImpulseParams } from '../../generator/core/types';
import { Button } from '../../../components/ui/Button/Button';
import styles from './PresetsDrawer.module.css';

type Props = {
  presets: Preset[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onLoad: (params: ImpulseParams) => void;
  onDelete: (id: string) => Promise<void>;
  onExport: () => Promise<void>;
  onRefresh: (search?: string) => void;
  onMarkUsed: (id: string) => Promise<void>;
};

export function PresetsDrawer({
  presets,
  isLoading,
  error,
  onClose,
  onLoad,
  onDelete,
  onExport,
  onRefresh,
  onMarkUsed,
}: Props) {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    onRefresh();
  }, []); 

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    onRefresh(search.trim() || undefined);
  }

  async function handleLoad(preset: Preset) {
    const params: ImpulseParams = {
      impulseType: preset.impulseType,
      sampleRate: preset.parameters.sampleRate,
      duration: preset.parameters.duration,
      amplitude: preset.parameters.amplitude,
      channels: preset.parameters.channels,
      balance: preset.parameters.balance,
      fadeIn: preset.parameters.fadeIn,
      fadeOut: preset.parameters.fadeOut,
    };

    onLoad(params);
    await onMarkUsed(preset._id);
    onClose();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this preset?')) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Presets</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className={styles.searchRow}>
          <input
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
          />
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        <div className={styles.toolbar}>
          <Button type="button" variant="ghost" size="sm" onClick={() => onExport()}>
            Export JSON
          </Button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isLoading ? (
          <p className={styles.empty}>Loading…</p>
        ) : presets.length === 0 ? (
          <p className={styles.empty}>No presets yet. Save your first one!</p>
        ) : (
          <ul className={styles.list}>
            {presets.map((preset) => (
              <li key={preset._id} className={styles.item}>
                <div className={styles.itemMain}>
                  <strong className={styles.itemName}>{preset.name}</strong>
                  <span className={styles.itemMeta}>
                    {preset.impulseType} · {preset.parameters.sampleRate} Hz ·{' '}
                    {preset.parameters.duration}s · {preset.parameters.channels}
                  </span>
                  {preset.tags.length > 0 && (
                    <span className={styles.tags}>
                      {preset.tags.map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                  {preset.description && (
                    <p className={styles.itemDescription}>{preset.description}</p>
                  )}
                </div>
                <div className={styles.itemActions}>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => handleLoad(preset)}
                  >
                    Load
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(preset._id)}
                    disabled={deletingId === preset._id}
                  >
                    {deletingId === preset._id ? '…' : 'Delete'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}