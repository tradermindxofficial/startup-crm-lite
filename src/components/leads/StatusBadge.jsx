/**
 * @fileoverview Reusable component to display a colored status pill.
 */
import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeStyles = (status) => {
    switch (status) {
      case 'Won': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'Lost': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      case 'New': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
      case 'Contacted': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      case 'Meeting Scheduled': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400';
      case 'Proposal Sent': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
}
