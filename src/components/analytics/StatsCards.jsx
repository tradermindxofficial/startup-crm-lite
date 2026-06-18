import React, { memo } from "react";
import {
  Users,
  TrendingUp,
  IndianRupee,
  Trophy,
  Clock3,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { formatCurrency, formatPercent } from "../../utils/analyticsHelpers";

const TrendBadge = memo(function TrendBadge({ value, inverse = false }) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNegative = inverse ? value > 0 : value < 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        isPositive
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          : isNegative
          ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      {value !== 0 ? <Icon className="h-3.5 w-3.5" /> : null}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
});

const KpiCard = memo(function KpiCard({ icon: Icon, label, value, trend, inverseTrend = false, accent }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={`rounded-xl p-2.5 ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
          <TrendBadge value={trend} inverse={inverseTrend} />
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</p>
      </CardContent>
    </Card>
  );
});

const StatsCards = memo(function StatsCards({ stats, growth }) {
  const cards = [
    {
      key: "totalLeads",
      icon: Users,
      label: "Total Leads",
      value: stats.totalLeads.toLocaleString("en-IN"),
      trend: growth.totalLeads,
      accent: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      key: "conversionRate",
      icon: TrendingUp,
      label: "Conversion Rate",
      value: formatPercent(stats.conversionRate),
      trend: growth.conversionRate,
      accent: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    {
      key: "pipelineValue",
      icon: IndianRupee,
      label: "Pipeline Value",
      value: formatCurrency(stats.pipelineValue),
      trend: growth.pipelineValue,
      accent: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
    },
    {
      key: "wonRevenue",
      icon: Trophy,
      label: "Won Revenue",
      value: formatCurrency(stats.wonRevenue),
      trend: growth.wonRevenue,
      accent: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
    },
    {
      key: "avgSalesCycle",
      icon: Clock3,
      label: "Average Sales Cycle",
      value: `${Math.round(stats.avgSalesCycle)} Days`,
      trend: growth.avgSalesCycle,
      inverseTrend: true,
      accent: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300",
    },
    {
      key: "lostRate",
      icon: TrendingDown,
      label: "Lost Rate",
      value: formatPercent(stats.lostRate),
      trend: growth.lostRate,
      inverseTrend: true,
      accent: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {cards.map(({ key: cardKey, ...card }) => (
        <KpiCard key={cardKey} {...card} />
      ))}
    </div>
  );
});

export default StatsCards;
