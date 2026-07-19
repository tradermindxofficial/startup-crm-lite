/**
 * @fileoverview Displays a table of the most recently added leads.
 */

import React from 'react';
import { formatDate } from '../../utils/analyticsHelpers';

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
        <table className="w-full min-w-0 border-collapse text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-5">Name</th>
              <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:table-cell">Company</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-5">Status</th>
              <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 md:table-cell">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white sm:px-5">
                  <div>
                    <p>{lead.name}</p>
                    <p className="truncate text-xs text-gray-500 sm:hidden">{lead.company}</p>
                  </div>
                </td>
                <td className="hidden px-5 py-3 text-sm text-gray-600 dark:text-gray-300 sm:table-cell">{lead.company}</td>
                <td className="px-4 py-3 sm:px-5">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getBadgeStyles(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="hidden px-5 py-3 text-sm text-gray-500 dark:text-gray-400 md:table-cell">{formatDate(lead.createdAt)}</td>
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
