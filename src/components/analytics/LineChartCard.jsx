import React, { memo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";
import { CHART_COLORS } from "../../constants/analyticsColors";

const LineTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
      <p className="text-slate-600 dark:text-slate-300">{payload[0].value}%</p>
    </div>
  );
};

const LineChartCard = memo(function LineChartCard({ data = [] }) {
  const hasData = data.length > 0 && data.some((item) => item.total > 0);

  return (
    <Card className="h-full">
      <CardHeader title="Monthly Conversion Trend" description="Won leads divided by total leads" />
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-center text-sm text-slate-500">
            No conversion data available.
          </div>
        ) : (
          <ChartContainer>
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={CHART_COLORS.border} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.slate, fontSize: 12 }} />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: CHART_COLORS.slate, fontSize: 12 }}
              />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone"
                dataKey="conversionRate"
                stroke={CHART_COLORS.success}
                strokeWidth={3}
                dot={{ r: 4, fill: CHART_COLORS.success, stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                isAnimationActive
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
});

export default LineChartCard;
