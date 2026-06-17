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
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        aria-label="Search leads"
        placeholder="Search by name, company, or email..."
        className="block w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
