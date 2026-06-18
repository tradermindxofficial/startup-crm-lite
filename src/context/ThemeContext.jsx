import React, { createContext, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'startup-crm-theme';

function getStoredTheme() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
}

function applyThemePreference(isDarkMode) {
  document.documentElement.classList.toggle('dark', isDarkMode);
  window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
}

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
  const [isDarkMode, setIsDarkMode] = useState(getStoredTheme);

  useEffect(() => {
    applyThemePreference(isDarkMode);
  }, [isDarkMode]);

  /**
   * Toggles the active theme mode between light and dark.
   * 
   * @returns {void}
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      applyThemePreference(nextMode);
      return nextMode;
    });
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
