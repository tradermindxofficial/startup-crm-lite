// Import React to use JSX syntax
import React from 'react';
// Import Link component from react-router-dom for client-side navigation
import { Link } from 'react-router-dom';

// Define the NotFound functional component
export default function NotFound() {
  // Return the JSX layout for the 404 page
  return (
    // Outer container taking full height, centering content using Flexbox and Tailwind CSS
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Large heading indicating the 404 error code */}
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      {/* Subheading explaining what went wrong */}
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">Page Not Found</h2>
      {/* Descriptive paragraph providing more context to the user */}
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      {/* Link acting as a button to navigate the user back to the home page (Dashboard) */}
      <Link 
        // The destination path for the link
        to="/" 
        // Tailwind styling for a primary button appearance with hover transitions
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        {/* Button text */}
        Return to Dashboard
      </Link>
    </div>
  );
}
