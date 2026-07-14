import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";
import MobileNavDrawer from "./components/common/MobileNavDrawer";
import AppRoutes from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { LeadProvider } from "./context/LeadContext.jsx";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const { token, isLoading } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show a full page loader while verifying credentials
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 text-gray-500 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg font-medium">Verifying user credentials...</p>
        </div>
      </div>
    );
  }

  // If there is no active token, render the auth pages cleanly without the Sidebar/TopBar dashboard layout
  if (!token) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex-1 overflow-y-auto">
          <AppRoutes />
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  // Authenticated Dashboard Layout
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6 lg:p-8">
          <AppRoutes />
        </div>
      </main>

      <BottomNav />
      <MobileNavDrawer isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeadProvider>
          <AppContent />
        </LeadProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
