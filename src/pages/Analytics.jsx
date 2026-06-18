import React from "react";
import { useLeads } from "../context/LeadContext";
import { getSummaryStats } from "../utils/analyticsHelpers";
import PieChartCard from "../components/analytics/PieChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";
import StatCard from "../components/analytics/StatCard";
import { Users, TrendingUp, Clock, BarChart3 } from "lucide-react";

/**
 * Analytics page – premium dashboard with summary stats and three charts.
 */
const Analytics = () => {
  const { leads } = useLeads();
  const { total, wonRate, avgCloseDays } = getSummaryStats(leads);

  /* ── Empty state ── */
  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No Analytics Yet
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
          Start adding leads to unlock insights. Charts will populate automatically as your pipeline grows.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your pipeline performance at a glance
        </p>
      </div>

      {/* ── Summary stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          value={total}
          label="Total Leads"
          gradient="linear-gradient(135deg, #6366F1, #818CF8)"
          iconBg="rgba(255,255,255,0.2)"
        />
        <StatCard
          icon={TrendingUp}
          value={`${wonRate}%`}
          label="Won Rate"
          gradient="linear-gradient(135deg, #22C55E, #4ADE80)"
          iconBg="rgba(255,255,255,0.2)"
        />
        <StatCard
          icon={Clock}
          value={avgCloseDays ? `${avgCloseDays}d` : "N/A"}
          label="Avg Time to Close"
          gradient="linear-gradient(135deg, #F59E0B, #FBBF24)"
          iconBg="rgba(255,255,255,0.2)"
        />
      </div>

      {/* ── Charts grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChartCard leads={leads} />
        <BarChartCard leads={leads} />
        <LineChartCard leads={leads} />
      </div>
    </div>
  );
};

export default Analytics;