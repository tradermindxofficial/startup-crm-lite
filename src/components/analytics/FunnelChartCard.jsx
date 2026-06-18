import React, { memo } from "react";
import { Funnel, FunnelChart, LabelList, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";
import { STATUS_COLORS } from "../../constants/analyticsColors";

const FunnelTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{item.stage}</p>
      <p className="text-slate-600 dark:text-slate-300">{item.count} leads</p>
      <p className="text-slate-600 dark:text-slate-300">Conversion: {item.conversion}%</p>
      <p className="text-slate-600 dark:text-slate-300">Drop-off: {item.dropOff}%</p>
    </div>
  );
};

const FunnelChartCard = memo(function FunnelChartCard({ data = [] }) {
  const chartData = data.map((item) => ({
    ...item,
    fill: STATUS_COLORS[item.stage] ?? "#94A3B8",
    label: `${item.stage} ${item.count}`,
  }));

  return (
    <Card className="h-full">
      <CardHeader title="Sales Funnel" description="Stage conversion and drop-off metrics" />
      <CardContent>
        <ChartContainer>
          <FunnelChart>
            <Tooltip content={<FunnelTooltip />} />
            <Funnel dataKey="count" data={chartData} isAnimationActive>
              <LabelList position="right" fill="#334155" stroke="none" dataKey="label" />
            </Funnel>
          </FunnelChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {data.map((item) => (
            <div key={item.stage} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p className="text-xs text-slate-500">{item.stage}</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.count}</p>
              <p className="text-xs text-emerald-600">{item.conversion}% conv</p>
              <p className="text-xs text-rose-500">{item.dropOff}% drop</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default FunnelChartCard;
