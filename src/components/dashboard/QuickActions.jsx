/**
 * @fileoverview Quick action buttons for the dashboard.
 */

import React from 'react';
import { Plus, ListFilter, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Renders a set of quick action buttons (Add Lead, View All, Export).
 * 
 * @returns {JSX.Element} The rendered QuickActions component.
 */
export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        {/* Add New Lead Button */}
        <Link 
          to="/leads" 
          state={{ openAddModal: true }} 
          className="flex items-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          <Plus size={16} />
          Add New Lead
        </Link>
        
        {/* View All Leads Link */}
        <Link to="/leads" className="flex items-center gap-2 w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-md border border-slate-200 dark:border-slate-700 transition-colors">
          <ListFilter size={16} />
          View All Leads
        </Link>
        
        {/* Export Data Button */}
        <button className="flex items-center gap-2 w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-md border border-slate-200 dark:border-slate-700 transition-colors">
          <Download size={16} />
          Export Data
        </button>
      </div>
    </div>
  );
}
