/**
 * @fileoverview SearchBar component with debounced search query emission.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef(null);

  // Synchronize local input state if the parent query value changes externally (e.g. cleared)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Clear previous timeout and schedule new search event emission
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Clean up timeouts on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex-1 w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        aria-label="Search leads"
        placeholder="Search by name, company, or email..."
        className="block min-h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-base text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white sm:text-sm"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
