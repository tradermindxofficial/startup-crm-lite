import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import TopBar from "./components/common/TopBar";
import BottomNav from "./components/common/BottomNav";
import MobileNavDrawer from "./components/common/MobileNavDrawer";
import AppRoutes from "./routes";

export default function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
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
      </div>
    </BrowserRouter>
  );
}
