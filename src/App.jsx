// Import React and the useState hook for managing local component state
import React, { useState } from "react";
// Import BrowserRouter to enable client-side routing across the application
import { BrowserRouter } from "react-router-dom";
// Import the Sidebar component for the application navigation
import Sidebar from "./components/common/Sidebar";
// Import the TopBar component for the top header
import TopBar from "./components/common/TopBar";
// Import the AppRoutes component which contains all the lazy-loaded route definitions
import AppRoutes from "./routes";

// Define the main App functional component
export default function App() {
  // Declare a state variable to manage the sidebar's open/close status, default to true
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Return the main application layout
  return (
    // Wrap the entire application in BrowserRouter to provide routing context to all nested components
    <BrowserRouter>
      {/* Main app container using Tailwind classes for full viewport height and width, and a flex layout */}
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* Render the Sidebar component, passing the current state of isSidebarOpen */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Main content area that grows to fill the remaining horizontal space */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Render the TopBar component, passing down a toggle function and the current state */}
          <TopBar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
          
          {/* Container for the routed page content with padding and vertical scrolling */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {/* Render the AppRoutes component where the specific page content will be injected based on the URL */}
            <AppRoutes />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}