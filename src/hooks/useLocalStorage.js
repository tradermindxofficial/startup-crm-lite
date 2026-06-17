import { useState, useCallback } from 'react';

/**
 * Custom hook to manage React state synchronized with window.localStorage.
 * Behaves identically to useState, but automatically loads persisted state
 * on mount and writes changes back to localStorage on update.
 * Gracefully handles missing storage capabilities (private tabs, cookies blocked) and parsing errors.
 * 
 * @template T
 * @param {string} key - The key under which the data is saved in LocalStorage.
 * @param {T} initialValue - The fallback value if no data exists yet.
 * @returns {[T, function((T | function(T): T)): void]} A stateful value and a function to update it.
 */
export default function useLocalStorage(key, initialValue) {
  // Read and parse localStorage value on initial mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      // If found, parse and return it; otherwise return the initial fallback value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Updates state value and writes to localStorage.
   * Supports both raw values and functional update callbacks.
   * 
   * @param {T | function(T): T} value - The new value or updater function.
   * @returns {void}
   */
  const setValue = useCallback((value) => {
    try {
      // Allow value to be an updater function so it behaves identically to useState
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        
        // Write to localStorage safely
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (storageError) {
          console.warn(`Error writing to localStorage key "${key}":`, storageError);
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error updating state for key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
