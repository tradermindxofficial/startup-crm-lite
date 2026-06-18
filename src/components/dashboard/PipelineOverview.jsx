/**
 * @fileoverview Visual horizontal bar representing the distribution of lead statuses.
 */

import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Lead ID.
 * @property {string} status - Lead status ('New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost').
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - Array of lead objects to analyze.
 */

/**
 * Calculates the status distribution and renders a horizontal progress bar.
 * 
 * @param {PipelineOverviewProps} props - The component props.
 * @returns {JSX.Element} The rendered PipelineOverview component.
 */
export default function PipelineOverview({ leads }) {
  const total = leads.length;
  
  // Calculate counts for each status
  const counts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Define colors for each status to match the requested palette
  const statusColors = {
    'New': 'bg-blue-600',       // Primary
    'Contacted': 'bg-amber-500',// Warning
    'Qualified': 'bg-purple-500',
    'Proposal': 'bg-indigo-500',
    'Won': 'bg-green-500',      // Success
    'Lost': 'bg-red-500'        // Danger
  };

  // Define the order to display the segments
  const order = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Pipeline Overview</h3>
      
      {/* Horizontal Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex mb-4">
        {total > 0 ? order.map(status => {
          const count = counts[status] || 0;
          if (count === 0) return null;
          const width = `${(count / total) * 100}%`;
          return (
            <div 
              key={status} 
              style={{ width }} 
              className={`h-full ${statusColors[status] || 'bg-gray-300'}`}
              title={`${status}: ${count} (${Math.round((count/total)*100)}%)`}
            />
          );
        }) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {order.map(status => {
          const count = counts[status] || 0;
          if (count === 0) return null;
          return (
            <div key={status} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${statusColors[status] || 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {status} <span className="font-medium text-gray-900 dark:text-white">({count})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
