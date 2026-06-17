/**
 * @fileoverview Reusable statistics card component for displaying key metrics.
 */

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The title of the metric.
 * @property {string|number} value - The main metric value.
 * @property {React.ElementType} icon - The Lucide icon component.
 * @property {number} change - The percentage change (+ or -).
 * @property {string} color - A Tailwind text color class for the icon (e.g., 'text-blue-600').
 */

/**
 * Displays a single metric with a title, value, icon, and trend indicator.
 * 
 * @param {StatsCardProps} props - The component props.
 * @returns {JSX.Element} The rendered StatsCard component.
 */
export default function StatsCard({ title, value, icon: Icon, change, color }) {
  const isPositive = change >= 0;
  const trendColor = isPositive ? 'text-green-500' : 'text-red-500';
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <div className={`p-2 rounded-md bg-slate-50 dark:bg-slate-800 ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendIcon size={14} className={trendColor} />
          <span className={`text-xs font-semibold ${trendColor}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
}
