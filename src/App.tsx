import { useState } from 'react';                    
import { useTheme } from './providers/ThemeProvider';
import './App.css';

import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';
import { Slider } from './components/ui/Slider/Slider';
import { Select } from './components/ui/Select/Select';
import { Card } from './components/ui/Card/Card';

function App() {
  // State för att testa komponenterna
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('');           
  const [duration, setDuration] = useState(2.5);
  const [amplitude, setAmplitude] = useState(0.8);
  const [sampleRate, setSampleRate] = useState(44100);     

  const handleGenerate = () => {
    alert(`Genererar IR med namn: ${name}, duration: ${duration}s, amplitude: ${amplitude}, sample rate: ${sampleRate} Hz`);
  };

  // Options för Select
  const sampleRateOptions = [
    { value: 44100, label: '44.1 kHz' },
    { value: 48000, label: '48 kHz' },
    { value: 96000, label: '96 kHz' },
    { value: 192000, label: '192 kHz' },
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      maxWidth: '600px' 
    }}>
      
      <h1>Pure Spike Studio - Components test</h1>

      {/* Theme Switch Test */}
      <div>
        <h2>Theme Switch</h2>
        <Button variant="primary" onClick={toggleTheme}>
          Toggle Theme (Dark ↔ Light)
        </Button>
        
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Nuvarande theme: <strong>{theme}</strong>
        </p>
      </div>

      

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
        
        <Input
          type="text"
          label="Preset Name"
          placeholder="My IR-preset"
          value={name}
          onChange={setName}
        />

        <Input
          type="number"
          label="Duration (seconds)"
          value={duration}
          onChange={setDuration}
          min={0.1}
          max={10}
          step={0.1}
        />
      </div>

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
      </div>

      {/* Selects - NY SEKTOR */}
      <div>
        <h2>Selects</h2>
        
        <Select
          label="Sample Rate"
          value={sampleRate}
          onChange={setSampleRate}
          options={sampleRateOptions}
        />
      </div>

        {/* Cards */}
      <div>
        <h2>Cards / Panels</h2>
        
        <Card title="Test Panel">
          <p>Här kan du gruppera flera kontroller.</p>
          <Slider 
            label="Test Slider" 
            value={amplitude} 
            onChange={setAmplitude} 
            min={0} 
            max={1} 
            step={0.01} 
          />
        </Card>
      </div>



      {/* Visa alla aktuella värden */}
      <div>
        <p>
          Current values:<br />
          Name: <strong>{name || '(empty)'}</strong><br />
          Duration: <strong>{duration}</strong> Seconds<br />
          Amplitude: <strong>{amplitude}</strong><br />
          Sample Rate: <strong>{sampleRate} Hz</strong>
        </p>
      </div>

    </div>
  );
}

export default App;