import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, HelpCircle, ChevronsUpDown, Command } from 'lucide-react';

export default function Sidebar({ isOpen = true }) {
  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive 
        ? "bg-gray-200/60 text-gray-900 dark:bg-gray-800 dark:text-gray-100" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
    }`;
  };

  return (
    <aside className={`w-[260px] min-w-[260px] h-screen border-r border-gray-200 dark:border-gray-800 bg-[#F9FAFB] dark:bg-gray-900 flex flex-col sticky top-0 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
      
      {/* Workspace Selector (Notion style) */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white shrink-0">
              <Command size={14} />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">Startup CRM</span>
          </div>
          <ChevronsUpDown size={16} className="text-gray-500 shrink-0" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-0.5 mt-2">
        <NavLink to="/" className={getNavLinkClass}>
          <LayoutDashboard size={16} className="shrink-0" /> 
          <span className="truncate">Dashboard</span>
        </NavLink>
        <NavLink to="/leads" className={getNavLinkClass}>
          <Users size={16} className="shrink-0" /> 
          <span className="truncate">Leads</span>
        </NavLink>
        <NavLink to="/analytics" className={getNavLinkClass}>
          <BarChart3 size={16} className="shrink-0" /> 
          <span className="truncate">Analytics</span>
        </NavLink>
      </nav>

      {/* Bottom Settings/Profile Area */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-0.5">
        <NavLink to="/settings" className={getNavLinkClass}>
          <Settings size={16} className="shrink-0" /> 
          <span className="truncate">Settings</span>
        </NavLink>
        <NavLink to="/help" className={getNavLinkClass}>
          <HelpCircle size={16} className="shrink-0" /> 
          <span className="truncate">Help & Support</span>
        </NavLink>
      </div>
    </aside>
  );
}