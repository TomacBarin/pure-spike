import { useTheme } from './providers/ThemeProvider'
import './App.css'

import { Button } from './components/ui/Button/Button';

function App() {
  return (
    <div>
      <Button variant="primary" size="lg" onClick={() => alert('Primary!')}>
        Generate IR
      </Button>

      <Button variant="secondary" onClick={() => alert('Secondary')}>
        Save Preset
      </Button>

      <Button variant="ghost" disabled>
        Disabled Ghost
      </Button>
    </div>
  );
}

export default App