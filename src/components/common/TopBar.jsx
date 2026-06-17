import React from 'react';
import { Search, Bell, Menu, X } from "lucide-react";

export default function TopBar({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="md:hidden text-slate-600 hover:text-slate-900" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="max-w-md w-full relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Search leads, contacts, etc (Cmd+K)" 
            className="w-full h-9 pl-9 pr-4 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 ml-4">
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>
        
        <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          JD
        </button>
      </div>
    </header>
  );
}
