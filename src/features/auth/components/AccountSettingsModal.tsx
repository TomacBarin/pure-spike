import { useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { ApiError } from '../../../api/client';
import { Button } from '../../../components/ui/Button/Button';
import styles from './AccountSettingsModal.module.css';

type Props = {
  onClose: () => void;
};

export function AccountSettingsModal({ onClose }: Props) {
  const { user, deleteAccount } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = confirmText === 'DELETE';

  async function handleDelete() {
    if (!canDelete) return;

    setError(null);
    setIsDeleting(true);

    try {
      await deleteAccount();
      onClose();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to delete account'
      );
      setIsDeleting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-settings-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="account-settings-title" className={styles.title}>
            Account Settings
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Account</h3>
          <p className={styles.email}>{user?.email}</p>
        </div>

        <div className={styles.dangerZone}>
          <h3 className={styles.dangerTitle}>Danger Zone</h3>
          <p className={styles.dangerText}>
            Deleting your account permanently removes your user and all saved
            presets. This cannot be undone.
          </p>

          <label htmlFor="confirm-delete" className={styles.label}>
            Type <strong>DELETE</strong> to confirm
          </label>
          <input
            id="confirm-delete"
            className={styles.input}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            disabled={isDeleting}
            autoComplete="off"
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <Button
            type="button"
            variant="primary"
            className={styles.deleteButton}
            disabled={!canDelete || isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting…' : 'Delete account permanently'}
          </Button>
        </div>
      </div>
    </div>
  );
}