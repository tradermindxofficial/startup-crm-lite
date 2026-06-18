/**
 * @fileoverview The main Dashboard page assembling all dashboard components.
 */

import React from "react";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";
import { useLeads } from "../context/LeadContext";

export default function Dashboard() {
  const { leads } = useLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back. Here&apos;s what&apos;s happening with your pipeline today.
        </p>
      </div>

      {/* Stats: 1 col mobile · 2 col tablet · 4 col desktop */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatsCard title="Total Leads" value="1,248" icon={Users} change={12.5} color="text-blue-600" />
        <StatsCard title="Active Opportunities" value="84" icon={Activity} change={5.2} color="text-amber-500" />
        <StatsCard title="Win Rate" value="32.4%" icon={TrendingUp} change={-2.1} color="text-purple-500" />
        <StatsCard title="Revenue Pipeline" value="$2.4M" icon={DollarSign} change={18.4} color="text-green-500" />
      </div>

      {/* Charts: full width mobile/tablet · 2 col desktop */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <PipelineOverview leads={leads} />
        <RecentLeads leads={leads} />
      </div>

      <QuickActions />
    </div>
  );
}
