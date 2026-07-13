import { useState } from 'react';                    
import { useTheme } from './providers/ThemeProvider';
import './App.css';

import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';
import { Slider } from './components/ui/Slider/Slider';

function App() {
  // State to test Input
  const [name, setName] = useState('');           
  const [duration, setDuration] = useState(2.5);
  const [amplitude, setAmplitude] = useState(0.8);

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
            label="Duration (seconds)"
            value={duration}
            onChange={setDuration}
            min={0.1}
            max={10}
            step={0.1}
          />

        {/* Sliders */}
      <div>
        <h2>Sliders</h2>
        
        <Slider
          label="Amplitude"
          value={amplitude}
          onChange={setAmplitude}
          min={0}
          max={1}
          step={0.01}
        />

        {/* Visa alla aktuella värden */}
        <p style={{ marginTop: '1.5rem' }}>
          Current values:<br />
          Name: <strong>{name || '(empty)'}</strong><br />
          Duration: <strong>{duration}</strong> Seconds<br />
          Amplitude: <strong>{amplitude}</strong>
        </p>
      </div>

    </div>

      

    </div>

    
  );



}




export default App;