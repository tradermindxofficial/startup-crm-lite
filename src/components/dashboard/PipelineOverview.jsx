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

  const counts = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = { count: 0, value: 0 };
    }
    acc[lead.status].count += 1;
    acc[lead.status].value += Number(lead.value || 0);
    return acc;
  }, {});

  const stages = [
    { label: 'New', color: 'bg-blue-600', text: 'text-blue-600 dark:text-blue-400' },
    { label: 'Contacted', color: 'bg-indigo-600', text: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Meeting Scheduled', color: 'bg-amber-500', text: 'text-amber-500 dark:text-amber-400' },
    { label: 'Proposal Sent', color: 'bg-purple-700', text: 'text-purple-700 dark:text-purple-400' },
    { label: 'Won', color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Lost', color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  ];

  const totalActiveValue = stages
    .filter((stage) => stage.label !== 'Lost')
    .reduce((sum, stage) => sum + (counts[stage.label]?.value || 0), 0);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pipeline Overview</h3>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Visual layout of lead stage distributions
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Total Active Value
          </p>
          <p className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalActiveValue)}
          </p>
        </div>
      </div>

      <div className="mb-7 flex h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {total > 0 ? stages.map((stage) => {
          const count = counts[stage.label]?.count || 0;
          if (!count) return null;
          const width = `${(count / total) * 100}%`;
          return (
            <div
              key={stage.label}
              className={stage.color}
              style={{ width }}
              title={`${stage.label}: ${count} lead${count !== 1 ? 's' : ''}`}
            />
          );
        }) : (
          <div className="h-full w-full bg-gray-100 dark:bg-gray-800" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {stages.map((stage) => {
          const count = counts[stage.label]?.count || 0;
          const value = counts[stage.label]?.value || 0;

          return (
            <div
              key={stage.label}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/20"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">{stage.label}</p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {count} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">leads</span>
              </p>
              <p className={`mt-1 text-sm font-bold ${stage.text}`}>{formatCurrency(value)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
