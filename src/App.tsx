import { useTheme } from './providers/ThemeProvider'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={{ 
      padding: '60px 20px', 
      textAlign: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)'
    }}>
      <h1>Pure Spike Studio</h1>
      <p>Current theme: <strong>{theme}</strong></p>

      <button 
        onClick={toggleTheme}
        style={{
          marginTop: '20px',
          padding: '12px 28px',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Toggle Theme (Dark ↔ Light)
      </button>

      
    </div>
  )
}

export default App