import React, { memo } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";
import { CHART_COLORS } from "../../constants/analyticsColors";

const SourceTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{item.source}</p>
      <p className="text-slate-600 dark:text-slate-300">{item.count} leads</p>
    </div>
  );
};

const LeadSourceChart = memo(function LeadSourceChart({ data = [] }) {
  const hasData = data.length > 0 && data.some((item) => item.count > 0);

  return (
    <Card className="h-full">
      <CardHeader title="Lead Source Analytics" description="Top acquisition channels" />
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-center text-sm text-slate-500">
            No lead source data available.
          </div>
        ) : (
          <ChartContainer>
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={CHART_COLORS.border} />
              <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.slate, fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="source"
                width={90}
                axisLine={false}
                tickLine={false}
                tick={{ fill: CHART_COLORS.slate, fontSize: 12 }}
              />
              <Tooltip content={<SourceTooltip />} cursor={{ fill: "rgba(37, 99, 235, 0.08)" }} />
              <Bar dataKey="count" fill={CHART_COLORS.primarySoft} radius={[0, 8, 8, 0]} isAnimationActive />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
});

export default LeadSourceChart;
