import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'dark' ? 'Claro' : 'Oscuro'}
    </button>
  );
};

export default ThemeToggle;