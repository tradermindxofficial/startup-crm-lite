import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { getMonthlyLeads } from "../../utils/analyticsHelpers";

/** Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{label}</p>
      <p className="text-gray-500 dark:text-gray-400">
        Leads:{" "}
        <span className="text-blue-600 dark:text-blue-400 font-bold">{payload[0].value}</span>
      </p>
    </div>
  );
};

/**
 * Premium bar chart – leads per month (last 6 months).
 * @param {{ leads: Array }} props
 */
const BarChartCard = ({ leads }) => {
  const data = getMonthlyLeads(leads ?? []);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  if (!leads || leads.length === 0) {
    return <EmptyCard title="Leads per Month" message="No monthly data to display yet." />;
  }

  return (
    <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
          Leads per Month
        </h3>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Last 6 months</span>
      </div>

      <div className="flex-1" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="32%">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-gray-700" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)", radius: 6 }} />
            <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={48} isAnimationActive>
              {data.map((entry, i) => (
                <Cell
                  key={`bar-${i}`}
                  fill={entry.count === maxCount ? "#2563EB" : "url(#barGrad)"}
                  opacity={entry.count === 0 ? 0.25 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const EmptyCard = ({ title, message }) => (
  <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-400 dark:text-gray-500 text-sm text-center">{message}</p>
    </div>
  </div>
);

export default BarChartCard;
