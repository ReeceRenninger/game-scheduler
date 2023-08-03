import React from 'react';
import { useTheme } from '../ThemeContext';

const DarkModeButton = () => {
  const { darkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('dark mode button clicked');
    toggleTheme();
  }

  return (
    <button onClick={handleClick}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeButton;