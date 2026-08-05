import { useState, type FormEvent } from 'react';
import type { ImpulseParams } from '../../generator/core/types';
import { Button } from '../../../components/ui/Button/Button';
import { ApiError } from '../../../api/client';
import styles from './SavePresetModal.module.css';

type Props = {
  params: ImpulseParams;
  onSave: (input: {
    name: string;
    description?: string;
    tags?: string[];
    impulseType: 'pure' | 'noise';
    parameters: {
      sampleRate: 44100 | 48000 | 96000;
      duration: number;
      amplitude: number;
      channels: 'mono' | 'stereo';
      balance: number;
      fadeIn: number;
      fadeOut: number;
    };
  }) => Promise<void>;
  onClose: () => void;
};

export function SavePresetModal({ params, onSave, onClose }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await onSave({
        name: name.trim(),
        description: description.trim() || undefined,
        tags,
        impulseType: params.impulseType,
        parameters: {
          sampleRate: params.sampleRate,
          duration: params.duration,
          amplitude: params.amplitude,
          channels: params.channels,
          balance: params.balance,
          fadeIn: params.fadeIn,
          fadeOut: params.fadeOut,
        },
      });
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save preset');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Save Preset</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="preset-name" className={styles.label}>Name *</label>
            <input
              id="preset-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="preset-description" className={styles.label}>Description</label>
            <textarea
              id="preset-description"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="preset-tags" className={styles.label}>Tags (comma-separated)</label>
            <input
              id="preset-tags"
              className={styles.input}
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. kick, short, mono"
              disabled={isSubmitting}
            />
          </div>

          <p className={styles.summary}>
            Saving current settings: <strong>{params.impulseType}</strong>, {params.sampleRate} Hz,{' '}
            {params.duration}s, {params.channels}
          </p>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? 'Saving…' : 'Save Preset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}