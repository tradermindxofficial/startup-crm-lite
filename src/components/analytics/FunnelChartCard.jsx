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
  const getShortStage = (stage) => {
    if (stage === "Meeting Scheduled") return "Meeting";
    if (stage === "Proposal Sent") return "Proposal";
    return stage;
  };

  const chartData = data.map((item) => ({
    ...item,
    fill: STATUS_COLORS[item.stage] ?? "#94A3B8",
    label: `${getShortStage(item.stage)}: ${item.count}`,
  }));

  const hasData = data.length > 0 && data.some((item) => item.count > 0);

  return (
    <Card className="h-full">
      <CardHeader title="Sales Funnel" description="Stage conversion and drop-off metrics" />
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-center text-sm text-slate-500">
            No funnel data available.
          </div>
        ) : (
          <>
            <ChartContainer>
              <FunnelChart margin={{ top: 10, right: 120, left: 20, bottom: 10 }}>
                <Tooltip content={<FunnelTooltip />} />
                <Funnel dataKey="count" data={chartData} isAnimationActive>
                  <LabelList position="right" fill="#64748B" stroke="none" dataKey="label" fontSize={11} />
                </Funnel>
              </FunnelChart>
            </ChartContainer>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {data.map((item) => (
                <div key={item.stage} className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-700">
                  <p className="truncate text-xs font-semibold text-slate-500" title={item.stage}>
                    {getShortStage(item.stage)}
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{item.count}</p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">{item.conversion}% conv</p>
                  <p className="text-[10px] font-semibold text-rose-500">{item.dropOff}% drop</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
});

export default FunnelChartCard;
