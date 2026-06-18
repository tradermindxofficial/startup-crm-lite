import React, { memo } from "react";
import { CalendarDays } from "lucide-react";

const FILTER_OPTIONS = [
  { key: "last7", label: "Last 7 Days", shortLabel: "7D" },
  { key: "last30", label: "Last 30 Days", shortLabel: "30D" },
  { key: "last90", label: "Last 90 Days", shortLabel: "90D" },
  { key: "thisYear", label: "This Year", shortLabel: "Year" },
  { key: "custom", label: "Custom Range", shortLabel: "Custom" },
];

const AnalyticsFilters = memo(function AnalyticsFilters({
  activeFilter,
  onFilterChange,
  customRange,
  onCustomRangeChange,
}) {
  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
      <div className="flex w-full gap-2 overflow-x-auto pb-1 md:inline-flex md:flex-wrap md:overflow-visible md:rounded-xl md:border md:border-slate-200 md:bg-slate-50 md:p-1 dark:md:border-slate-700 dark:md:bg-slate-800/60">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onFilterChange(option.key)}
            className={`min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeFilter === option.key
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                : "bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white md:bg-transparent"
            }`}
          >
            <span className="sm:hidden">{option.shortLabel}</span>
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      {activeFilter === "custom" ? (
        <div className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
          <input
            type="date"
            value={customRange?.start ?? ""}
            onChange={(event) => onCustomRangeChange({ ...customRange, start: event.target.value })}
            className="min-h-11 flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
          <span className="text-sm text-slate-500">to</span>
          <input
            type="date"
            value={customRange?.end ?? ""}
            onChange={(event) => onCustomRangeChange({ ...customRange, end: event.target.value })}
            className="min-h-11 flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
      ) : null}
    </div>
  );
});

export default AnalyticsFilters;
