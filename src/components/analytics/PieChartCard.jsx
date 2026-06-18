import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { getStatusDistribution } from "../../utils/analyticsHelpers";

/** Custom tooltip for the pie chart */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{d.displayName}</p>
      <p className="text-gray-500 dark:text-gray-400">Count: <span className="text-gray-800 dark:text-white font-bold">{d.value}</span></p>
      <p className="text-gray-500 dark:text-gray-400">Share: <span className="text-gray-800 dark:text-white font-bold">{d.percent}%</span></p>
    </div>
  );
};

/**
 * Premium pie chart card – lead status distribution.
 * @param {{ leads: Array }} props
 */
const PieChartCard = ({ leads }) => {
  const data = getStatusDistribution(leads ?? []);

  if (!leads || leads.length === 0) {
    return (
      <EmptyCard title="Lead Status Distribution" message="Add leads to see their status distribution." />
    );
  }

  return (
    <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Lead Status Distribution
      </h3>

      {/* Chart */}
      <div className="flex-1 min-h-0" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="displayName"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={3}
              isAnimationActive
            >
              {data.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend below the chart */}
      <ul className="mt-4 space-y-2">
        {data.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-gray-600 dark:text-gray-300">{item.displayName}</span>
            </span>
            <span className="flex gap-3 text-gray-500 dark:text-gray-400 font-medium tabular-nums">
              <span>{item.value} leads</span>
              <span className="w-12 text-right">{item.percent}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Shared empty state component */
const EmptyCard = ({ title, message }) => (
  <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-400 dark:text-gray-500 text-sm text-center">{message}</p>
    </div>
  </div>
);

export default PieChartCard;
