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
    const attempts = 3;
    let totalLatency = 0;
    for (let i = 0; i < attempts; i++) {
      const start = performance.now();
      try {
        await fetch('https://backend-speed-test.onrender.com/speed/ping', {
          signal: AbortSignal.timeout(5000),
        });
        const end = performance.now();
        totalLatency += (end - start) / 2;
      } catch (error) {
        console.error('Error en latencia:', error);
        totalLatency += 999;
      }
    }
    setLatency((totalLatency / attempts).toFixed(2));
  };

  const medirDescarga = async () => {
    const attempts = 3;
    let totalSpeed = 0;
    const fileSizeMB = 50;
    for (let i = 0; i < attempts; i++) {
      const start = performance.now();
      try {
        const response = await fetch('https://backend-speed-test.onrender.com/speed/download', {
          signal: AbortSignal.timeout(15000), // Aumentado a 15 segundos
        });
        await response.blob();
        const end = performance.now();
        const tiempoSegundos = (end - start) / 1000;
        const velocidadMbps = (fileSizeMB * 8) / tiempoSegundos;
        totalSpeed += velocidadMbps;
      } catch (error) {
        console.error('Error en descarga:', error);
        totalSpeed += 0;
      }
    }
    setDownloadSpeed((totalSpeed / attempts).toFixed(2));
  };

  const medirSubida = async () => {
    const attempts = 3;
    let totalSpeed = 0;
    const fileSizeMB = 1; // Reducido a 1 MB
    for (let i = 0; i < attempts; i++) {
      const start = performance.now();
      const data = new Blob([new ArrayBuffer(fileSizeMB * 1024 * 1024)]);
      try {
        await fetch('https://backend-speed-test.onrender.com/speed/upload', {
          method: 'POST',
          body: data,
          signal: AbortSignal.timeout(15000), // Aumentado a 15 segundos
        });
        const end = performance.now();
        const tiempoSegundos = (end - start) / 1000;
        const velocidadMbps = (fileSizeMB * 8) / tiempoSegundos;
        totalSpeed += velocidadMbps;
      } catch (error) {
        console.error('Error en subida:', error);
        // Reintento en caso de fallo
        try {
          const retryStart = performance.now();
          await fetch('https://backend-speed-test.onrender.com/speed/upload', {
            method: 'POST',
            body: data,
            signal: AbortSignal.timeout(15000),
          });
          const retryEnd = performance.now();
          const retryTiempoSegundos = (retryEnd - retryStart) / 1000;
          totalSpeed += (fileSizeMB * 8) / retryTiempoSegundos;
        } catch (retryError) {
          console.error('Reintento fallido en subida:', retryError);
          totalSpeed += 0;
        }
      }
    }
    setUploadSpeed((totalSpeed / attempts).toFixed(2));
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
        <button
          className={`start-button ${testing ? 'testing' : ''}`}
          onClick={iniciarPruebas}
          disabled={testing}
        >
          {testing ? 'Probando...' : 'Iniciar'}
        </button>
        <div className="results">
          <div className="speed-meters">
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
          <div className="latency">
            <h3>Latencia</h3>
            <p>{latency} ms</p>
          </div>
        </div>
      </main>
      <footer>
        <p>JDOL Software © 2025 </p>
      </footer>
    </div>
  );
}

export default App;