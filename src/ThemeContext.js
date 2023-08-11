// import { createContext, useContext, useState } from 'react';

// const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setDarkMode(prevMode => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// const useTheme = () => {
//   return useContext(ThemeContext);
// }

// export { ThemeProvider, useTheme };

import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(darkMode => !darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}