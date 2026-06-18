import React, { memo } from "react";
import { Medal } from "lucide-react";
import { Card, CardContent, CardHeader } from "./Card";
import { formatCurrency } from "../../utils/analyticsHelpers";

const TopPerformersCard = memo(function TopPerformersCard({ performers = [] }) {
  return (
    <Card className="h-full">
      <CardHeader title="Top Performers" description="Ranked by won revenue" />
      <CardContent>
        {!performers.length ? (
          <div className="flex h-48 items-center justify-center text-sm text-slate-500">
            No won deals yet to rank performers.
          </div>
        ) : (
          <ul className="space-y-3">
            {performers.map((performer, index) => (
              <li
                key={performer.owner}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{performer.owner}</p>
                    <p className="text-xs text-slate-500">Sales Rep</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(performer.revenue)}</p>
                  {index === 0 ? <Medal className="ml-auto mt-1 h-4 w-4 text-amber-500" /> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
});

export default TopPerformersCard;
