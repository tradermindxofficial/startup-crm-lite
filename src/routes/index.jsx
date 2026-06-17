// Import React and its lazy and Suspense utilities for code splitting
import React, { lazy, Suspense } from 'react';
// Import routing components from react-router-dom
import { Routes, Route } from 'react-router-dom';

// Lazily load the Dashboard component to reduce the initial bundle size
const Dashboard = lazy(() => import('../pages/Dashboard'));
// Lazily load the Leads component
const Leads = lazy(() => import('../pages/Leads'));
// Lazily load the Analytics component
const Analytics = lazy(() => import('../pages/Analytics'));
// Lazily load the NotFound component for unknown routes
const NotFound = lazy(() => import('../pages/NotFound'));

// Define the AppRoutes functional component to handle all application routing
export default function AppRoutes() {
  // Return the routing structure
  return (
    // Wrap Routes in Suspense to show a fallback UI while lazy-loaded components are fetching
    <Suspense 
      // The fallback UI to display during loading, styled with Tailwind CSS to center a simple loading message
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          Loading page...
        </div>
      }
    >
      {/* Routes container that looks through its children Routes and renders the first one that matches the current URL */}
      <Routes>
        {/* Define the index route (Dashboard) at the root path '/' */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Define the Leads route at the '/leads' path */}
        <Route path="/leads" element={<Leads />} />
        
        {/* Define the Analytics route at the '/analytics' path */}
        <Route path="/analytics" element={<Analytics />} />
        
        {/* Define a catch-all route using the '*' path to render the NotFound component for any undefined URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}