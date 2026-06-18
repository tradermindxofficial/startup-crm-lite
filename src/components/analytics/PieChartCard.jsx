import React, { memo, useState } from "react";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "./Card";
import ChartContainer from "./ChartContainer";

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
      <p className="text-slate-600 dark:text-slate-300">{item.value} Leads</p>
      <p className="text-slate-600 dark:text-slate-300">{item.percent}%</p>
    </div>
  );
};

const PieChartCard = memo(function PieChartCard({ data = [], totalLeads = 0 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasData = data.length > 0;

  return (
    <Card className="h-full">
      <CardHeader title="Lead Status Distribution" description="Pipeline composition by stage" />
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">No status data available.</div>
        ) : (
          <>
            <div className="relative">
              <ChartContainer height={256}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="78%"
                    paddingAngle={2}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    isAnimationActive
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ChartContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalLeads}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Leads</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {data.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-300">
                    {item.value} ({item.percent}%)
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
});

export default PieChartCard;
