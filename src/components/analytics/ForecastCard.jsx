import React, { memo } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "./Card";
import { formatCurrency } from "../../utils/analyticsHelpers";

const ForecastCard = memo(function ForecastCard({ forecast }) {
  const growth = forecast?.growth ?? 0;
  const isPositive = growth >= 0;

  return (
    <Card className="h-full">
      <CardHeader title="Revenue Forecast" description="Based on average revenue of last 6 months" />
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-400">Predicted Revenue Next Month</p>
        <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(forecast?.predictedRevenue ?? 0)}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-xs text-slate-500">Confidence Score</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{forecast?.confidence ?? 0}%</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-xs text-slate-500">Growth Trend</p>
            <p
              className={`mt-1 inline-flex items-center gap-1 text-lg font-semibold ${
                isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              {Math.abs(growth).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />
          Forecast model updated in real-time
        </div>
      </CardContent>
    </Card>
  );
});

export default ForecastCard;
