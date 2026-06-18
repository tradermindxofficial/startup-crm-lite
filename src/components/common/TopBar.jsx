import React from 'react';
import { Search, Bell, Menu, X } from "lucide-react";
import DarkModeToggle from './DarkModeToggle';

export default function TopBar({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0 transition-colors duration-200">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="max-w-md w-full relative group">
          <Search size={16} className="absolute left-3 top-1/2 -trangray-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Search leads, contacts, etc (Cmd+K)" 
            className="w-full h-9 pl-9 pr-4 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 ml-4">
        <DarkModeToggle />

        <button className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
        
        <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          JD
        </button>
      </div>
    </header>
  );
}
