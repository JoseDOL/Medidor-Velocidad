import React from 'react';
import GaugeChart from 'react-gauge-chart';

const Speedometer = ({ speed, theme }) => {
  const needleColor = theme === 'dark' ? '#ffffff' : '#333333';
  const progressColor = theme === 'dark' ? '#4caf50' : '#2196f3'; // Verde oscuro, azul claro

  return (
    <GaugeChart
      id={`gauge-${speed}`}
      nrOfLevels={1} // Solo un nivel para simular barra de carga
      arcWidth={0.4} // Arco grueso
      percent={speed / 100} // Progreso de 0 a 100%
      textColor={theme === 'dark' ? '#ffffff' : '#333333'}
      needleColor={needleColor}
      needleBaseColor={needleColor}
      colors={[progressColor, '#e0e0e0']} // Color de progreso y fondo gris
      arcPadding={0} // Sin espacio entre segmentos
      cornerRadius={0} // Sin redondeo para un look continuo
      style={{ width: '300px' }} // Tamaño fijo
      hideText={true} // Oculta texto interno (lo mostramos en App.js)
    />
  );
};

export default Speedometer;