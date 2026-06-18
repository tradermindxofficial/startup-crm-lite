import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition-colors duration-200 dark:bg-gray-700">
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-transform duration-200 dark:bg-gray-900 dark:text-amber-300 ${
            isDarkMode ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        >
          {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
        </span>
      </span>
      <span className="hidden sm:inline">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
}
