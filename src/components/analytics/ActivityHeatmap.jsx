import React, { memo, useMemo } from "react";
import { Card, CardContent, CardHeader } from "./Card";

const LEVELS = [
  "bg-slate-100 dark:bg-slate-800",
  "bg-blue-100 dark:bg-blue-900/40",
  "bg-blue-300 dark:bg-blue-700/60",
  "bg-blue-500 dark:bg-blue-500",
  "bg-blue-700 dark:bg-blue-400",
];

const getLevel = (total) => {
  if (!total) return 0;
  if (total === 1) return 1;
  if (total <= 3) return 2;
  if (total <= 5) return 3;
  return 4;
};

const ActivityHeatmap = memo(function ActivityHeatmap({ data = [] }) {
  const weeks = useMemo(() => {
    const grouped = [];
    for (let index = 0; index < data.length; index += 7) {
      grouped.push(data.slice(index, index + 7));
    }
    return grouped;
  }, [data]);

  const monthLabel = useMemo(() => {
    if (!data.length) return "";
    const first = new Date(data[0].date);
    const last = new Date(data[data.length - 1].date);
    const firstMonth = first.toLocaleString("default", { month: "short", year: "numeric" });
    const lastMonth = last.toLocaleString("default", { month: "short", year: "numeric" });
    return firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`;
  }, [data]);

  return (
    <Card className="h-full">
      <CardHeader title="Activity Heatmap" description={`Monthly activity view · ${monthLabel}`} />
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full flex-col gap-2">
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}\nCreated: ${day.created}\nMeetings: ${day.meetings}\nCalls: ${day.calls}`}
                      className={`h-3.5 w-3.5 rounded-sm ${LEVELS[getLevel(day.total)]}`}
                      aria-label={`${day.date}: ${day.total} activities`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <span>Less</span>
          {LEVELS.map((level, index) => (
            <span key={level} className={`h-3 w-3 rounded-sm ${level}`} title={`Level ${index}`} />
          ))}
          <span>More</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-xs text-slate-500">Leads Created</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.reduce((sum, day) => sum + day.created, 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-xs text-slate-500">Meetings Scheduled</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.reduce((sum, day) => sum + day.meetings, 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-xs text-slate-500">Calls Logged</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.reduce((sum, day) => sum + day.calls, 0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default ActivityHeatmap;
