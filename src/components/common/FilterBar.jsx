/**
 * @fileoverview FilterBar component displaying status categories and their corresponding lead counts.
 */
import React from 'react';

const STATUS_FILTERS = [
  'All',
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost'
];

export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  // Compute counts for each status
  const getCount = (status) => {
    if (status === 'All') return leads.length;
    return leads.filter(lead => lead.status === status).length;
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2 min-w-max">
        {STATUS_FILTERS.map((status) => {
          const isActive = activeFilter === status;
          const count = getCount(status);

          return (
            <button
              key={status}
              type="button"
              onClick={() => onFilterChange(status)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{status}</span>
              <span
                className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none ${
                  isActive
                    ? 'bg-blue-700 text-blue-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
