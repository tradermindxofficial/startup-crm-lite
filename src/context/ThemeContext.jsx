import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * @typedef {Object} ThemeContextType
 * @property {boolean} isDarkMode - Whether the dark theme mode is currently active.
 * @property {function(): void} toggleTheme - Function to toggle the dark mode state.
 */

/** @type {React.Context<ThemeContextType | null>} */
export const ThemeContext = createContext(null);

/**
 * ThemeProvider component that hosts the theme state and manages applying the dark class to the document element.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} The rendered provider element.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  // Sync theme changes with the document element class list
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the active theme mode between light and dark.
   * 
   * @returns {void}
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to consume the ThemeContext.
 * Throws a descriptive runtime error if context is consumed outside a ThemeProvider.
 * 
 * @returns {ThemeContextType} The verified ThemeContext values.
 * @throws {Error} If hook is used outside of a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure the component is wrapped by <ThemeProvider>.');
  }
  return context;
}
