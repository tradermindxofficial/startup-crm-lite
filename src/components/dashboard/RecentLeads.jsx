/**
 * @fileoverview Displays a table of the most recently added leads.
 */

import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {string|number} id - The lead identifier.
 * @property {string} name - The lead's contact name.
 * @property {string} company - The lead's company name.
 * @property {string} status - Current pipeline status.
 * @property {string} dateAdded - Date string when the lead was added.
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - Array of leads.
 */

/**
 * Renders a clean table showing the last 5 leads.
 * 
 * @param {RecentLeadsProps} props - Component properties.
 * @returns {JSX.Element} Rendered table component.
 */
export default function RecentLeads({ leads }) {
  // Take the first 5 leads for the mock dashboard view
  const recentLeads = leads.slice(0, 5);

  /**
   * Returns corresponding Tailwind classes for a given status.
   * @param {string} status - Lead status
   * @returns {string} Tailwind class names
   */
  const getBadgeStyles = (status) => {
    switch (status) {
      case 'Won': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'Lost': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      case 'Contacted':
      case 'Qualified':
      case 'Proposal': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Leads</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="py-3 px-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th className="py-3 px-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="py-3 px-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-5 text-sm font-medium text-gray-900 dark:text-white">{lead.name}</td>
                <td className="py-3 px-5 text-sm text-gray-600 dark:text-gray-300">{lead.company}</td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-5 text-sm text-gray-500 dark:text-gray-400">{lead.dateAdded}</td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-500">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
