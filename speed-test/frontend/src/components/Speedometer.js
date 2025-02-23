import React from 'react';
import GaugeChart from 'react-gauge-chart';

const Speedometer = ({ speed, theme }) => {
  // Definir el color de la aguja según el tema
  const needleColor = theme === 'dark' ? '#ffffff' : '#333333';

  return (
    <GaugeChart
      id={`gauge-${speed}`} // ID único basado en la velocidad
      nrOfLevels={20}
      percent={speed / 100} // Escala de 0 a 100 Mbps
      textColor={theme === 'dark' ? '#ffffff' : '#333333'} // Ajustar color del texto también
      needleColor={needleColor} // Color dinámico de la aguja
      colors={['#ff0000', '#ffff00', '#00ff00']}
      arcWidth={0.3}
    />
  );
};

export default Speedometer;