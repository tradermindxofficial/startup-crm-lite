import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import { getConversionByMonth } from "../../utils/analyticsHelpers";

/** Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      <p className="text-slate-500 dark:text-slate-400">
        Conversion:{" "}
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{payload[0].value}%</span>
      </p>
    </div>
  );
};

/** Custom animated dot */
const ActiveDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#22C55E"
      stroke="#fff"
      strokeWidth={3}
      style={{ filter: "drop-shadow(0 0 4px rgba(34,197,94,0.5))" }}
    />
  );
};

/**
 * Premium line chart – monthly conversion rate.
 * @param {{ leads: Array }} props
 */
const LineChartCard = ({ leads }) => {
  const data = getConversionByMonth(leads ?? []);

  if (!leads || leads.length === 0) {
    return <EmptyCard title="Conversion Rate" message="No conversion data to display yet." />;
  }

  return (
    <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
          Conversion Rate
        </h3>
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Won ÷ Total</span>
      </div>

      <div className="flex-1" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Shaded area beneath the line */}
            <Area
              type="monotone"
              dataKey="rate"
              fill="url(#lineArea)"
              stroke="transparent"
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4, fill: "#22C55E", stroke: "#fff", strokeWidth: 2 }}
              activeDot={<ActiveDot />}
              isAnimationActive
              name="Conversion %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const EmptyCard = ({ title, message }) => (
  <div className="card rounded-2xl p-6 shadow-md h-full flex flex-col">
    <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-4">{title}</h3>
    <div className="flex-1 flex items-center justify-center">
      <p className="text-slate-400 dark:text-slate-500 text-sm text-center">{message}</p>
    </div>
  </div>
);

export default LineChartCard;
