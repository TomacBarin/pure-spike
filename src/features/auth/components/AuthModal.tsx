import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { ApiError } from '../../../api/client';
import { Button } from '../../../components/ui/Button/Button';
import styles from './AuthModal.module.css';

type Mode = 'login' | 'register';

type AuthModalProps = {
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (mode: Mode) => void;
};

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'login';
  const title = isLogin ? 'Log in' : 'Create account';
  const submitLabel = isLogin ? 'Log in' : 'Register';
  const switchLabel = isLogin
    ? "Don't have an account? Register"
    : 'Already have an account? Log in';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="auth-modal-title" className={styles.title}>
            {title}
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

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="auth-email" className={styles.label}>
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="auth-password" className={styles.label}>
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              minLength={8}
              disabled={isSubmitting}
            />
            {!isLogin && (
              <p className={styles.hint}>
                Min 8 characters, at least one letter and one number
              </p>
            )}
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Please wait…' : submitLabel}
          </Button>
        </form>

        <button
          type="button"
          className={styles.switchButton}
          onClick={() => onSwitchMode(isLogin ? 'register' : 'login')}
          disabled={isSubmitting}
        >
          {switchLabel}
        </button>
      </div>
    </div>
  );
}