import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AuthModal } from './components/AuthModal';

type AuthMode = 'login' | 'register';

type AuthModalContextValue = {
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);

  const openLogin = useCallback(() => setMode('login'), []);
  const openRegister = useCallback(() => setMode('register'), []);
  const close = useCallback(() => setMode(null), []);

  const value = useMemo(
    () => ({ openLogin, openRegister, close }),
    [openLogin, openRegister, close]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      {mode && (
        <AuthModal
          mode={mode}
          onClose={close}
          onSwitchMode={setMode}
        />
      )}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return ctx;
}