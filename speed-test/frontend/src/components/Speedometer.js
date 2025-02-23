import React from 'react';
import GaugeChart from 'react-gauge-chart';

const Speedometer = ({ speed, theme }) => {
  const needleColor = theme === 'dark' ? '#ffffff' : '#333333';

  return (
    <GaugeChart
      id={`gauge-${speed}`}
      nrOfLevels={10}
      arcWidth={0.4}
      percent={speed / 100}
      textColor={theme === 'dark' ? '#ffffff' : '#333333'}
      needleColor={needleColor}
      needleBaseColor={needleColor}
      colors={['#2196f3', '#ffeb3b', '#4caf50']}
      arcPadding={0.02}
      cornerRadius={3}
      style={{ width: '300px' }}
      hideText={true} // Oculta cualquier texto interno del velocímetro
    />
  );
};

export default Speedometer;