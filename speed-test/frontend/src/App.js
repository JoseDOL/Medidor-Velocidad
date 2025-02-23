import React, { useState } from 'react';
import Speedometer from './components/Speedometer';
import ThemeToggle from './components/ThemeToggle';
import './styles.css';

function App() {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [latency, setLatency] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [testing, setTesting] = useState(false);

  const medirLatencia = async () => {
    const start = performance.now();
    await fetch('http://localhost:5000/speed/ping');
    const end = performance.now();
    setLatency(((end - start) / 2).toFixed(2));
  };

  const medirDescarga = async () => {
    const start = performance.now();
    const response = await fetch('http://localhost:5000/speed/download');
    await response.blob();
    const end = performance.now();
    const tiempoSegundos = (end - start) / 1000;
    const tamanoMB = 10;
    const velocidadMbps = (tamanoMB * 8) / tiempoSegundos;
    setDownloadSpeed(velocidadMbps.toFixed(2));
  };

  const medirSubida = async () => {
    const start = performance.now();
    const data = new Blob([new ArrayBuffer(10 * 1024 * 1024)]);
    await fetch('http://localhost:5000/speed/upload', {
      method: 'POST',
      body: data,
    });
    const end = performance.now();
    const tiempoSegundos = (end - start) / 1000;
    const tamanoMB = 10;
    const velocidadMbps = (tamanoMB * 8) / tiempoSegundos;
    setUploadSpeed(velocidadMbps.toFixed(2));
  };

  const iniciarPruebas = async () => {
    setTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setLatency(0);
    await medirLatencia();
    await medirDescarga();
    await medirSubida();
    setTesting(false);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Test de Velocidad</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      <main>
        <button onClick={iniciarPruebas} disabled={testing}>
          {testing ? 'Probando...' : 'Iniciar Prueba'}
        </button>
        <div className="results">
          <div>
            <h3>Latencia</h3>
            <p>{latency} ms</p>
          </div>
          <div>
            <h3>Descarga</h3>
            <Speedometer speed={downloadSpeed} theme={theme} />
            <p>{downloadSpeed} Mbps</p>
          </div>
          <div>
            <h3>Subida</h3>
            <Speedometer speed={uploadSpeed} theme={theme} />
            <p>{uploadSpeed} Mbps</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;