import { useTheme } from './providers/ThemeProvider'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ 
      padding: '60px 20px', 
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: 'var(--color-text-primary)' }}>Pure Spike Studio</h1>
      <p>Current theme: <strong>{theme}</strong></p>

      <button onClick={toggleTheme} style={{
        marginTop: '20px',
        padding: '12px 28px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        cursor: 'pointer'
      }}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App