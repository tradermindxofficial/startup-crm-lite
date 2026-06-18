import React, { memo } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";
import { CHART_COLORS } from "../../constants/analyticsColors";

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
      <p className="text-slate-600 dark:text-slate-300">{payload[0].value} Leads</p>
    </div>
  );
};

const BarChartCard = memo(function BarChartCard({ data = [] }) {
  return (
    <Card className="h-full">
      <CardHeader title="Monthly Leads Trend" description="Lead volume over the last 6 months" />
      <CardContent>
        <ChartContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={CHART_COLORS.border} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.slate, fontSize: 12 }} />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: CHART_COLORS.slate, fontSize: 12 }}
                label={{ value: "Lead Count", angle: -90, position: "insideLeft", fill: CHART_COLORS.slate }}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(37, 99, 235, 0.08)" }} />
              <Bar dataKey="leads" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} isAnimationActive />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

export default BarChartCard;
