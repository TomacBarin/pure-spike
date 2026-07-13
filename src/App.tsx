import { useState } from 'react';                    
import { useTheme } from './providers/ThemeProvider';
import './App.css';

import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';

function App() {
  // State to test Input
  const [name, setName] = useState('');           
  const [duration, setDuration] = useState(2.5);  

  const handleGenerate = () => {
    alert(`Genererar IR med namn: ${name} och duration: ${duration} sekunder`);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      
      <h1>Pure Spike Studio - Components test</h1>

      {/* Buttons */}
      <div>
        <h2>Buttons</h2>
        <Button variant="primary" size="lg" onClick={handleGenerate}>
          Generate IR
        </Button>

        <Button variant="secondary" onClick={() => alert('Secondary')}>
          Save Preset
        </Button>

        <Button variant="ghost" disabled>
          Disabled Ghost
        </Button>
      </div>

      {/* Inputs */}
      <div>
        <h2>Inputs</h2>
        
        {/* Text input */}
        <Input
          type="text"
          label="Preset Name"
          placeholder="My IR-preset"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Number input */}
        <Input
          type="number"
          label="Duration (sekunder)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          min={0.1}
          max={10}
          step={0.1}
        />

        {/* Show actual value */}
        <p>
          Current value:<br />
          Name: <strong>{name || '(empty)'}</strong><br />
          Duration: <strong>{duration}</strong> Seconds
        </p>
      </div>

    </div>
  );
}

export default App;