import React, { memo } from "react";
import { Gauge, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "./Card";
import { formatCurrency } from "../../utils/analyticsHelpers";

const SalesVelocityCard = memo(function SalesVelocityCard({ velocityData, trend = 0 }) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="h-full">
      <CardHeader title="Sales Velocity" description="(Opportunities × Win Rate × Avg Deal Size) ÷ Sales Cycle" />
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(velocityData?.velocity ?? 0)}
              <span className="text-base font-medium text-slate-500">/day</span>
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {velocityData?.opportunities ?? 0} opportunities · {velocityData?.winRate ?? 0}% win rate
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
            <Gauge className="h-6 w-6" />
          </div>
        </div>

        <div
          className={`mt-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {Math.abs(trend).toFixed(1)}% vs previous period
        </div>
      </CardContent>
    </Card>
  );
});

export default SalesVelocityCard;
