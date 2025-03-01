import React from 'react';
import GaugeChart from 'react-gauge-chart';

const Speedometer = ({ speed, theme }) => {
  const needleColor = theme === 'dark' ? '#ffffff' : '#333333';
  const progressColor = theme === 'dark' ? '#4caf50' : '#2196f3';

  return (
    <GaugeChart
      id={`gauge-${speed}`}
      nrOfLevels={30} // Más niveles para un llenado suave
      arcWidth={0.4}
      percent={speed / 100} // Progreso de 0 a 100%
      textColor={theme === 'dark' ? '#ffffff' : '#333333'}
      needleColor={needleColor}
      needleBaseColor={needleColor}
      colors={['#e0e0e0', progressColor]} // De gris a verde/azul
      arcPadding={0.02} // Espacio sutil entre segmentos
      cornerRadius={3} // Bordes redondeados
      style={{ width: '300px' }}
      hideText={true}
    />
  );
};

export default Speedometer;