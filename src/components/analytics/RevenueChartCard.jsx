import React, { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";
import { CHART_COLORS } from "../../constants/analyticsColors";
import { formatCurrency } from "../../utils/analyticsHelpers";

const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{label} Revenue</p>
      <p className="text-slate-600 dark:text-slate-300">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const RevenueChartCard = memo(function RevenueChartCard({ data = [] }) {
  return (
    <Card className="h-full">
      <CardHeader title="Revenue Analytics" description="Won deal revenue by month" />
      <CardContent>
        <ChartContainer>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.success} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={CHART_COLORS.success} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={CHART_COLORS.border} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.slate, fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
                axisLine={false}
                tickLine={false}
                tick={{ fill: CHART_COLORS.slate, fontSize: 12 }}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS.success}
                strokeWidth={3}
                fill="url(#revenueGradient)"
                isAnimationActive
              />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

export default RevenueChartCard;
