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

  // Dashboard statistics
  const totalLeads = leads.length;

  const activeOpportunities = leads.filter(
    (lead) => !["Won", "Lost"].includes(lead.status)
  ).length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const winRate =
    totalLeads === 0
      ? "0.0"
      : ((wonLeads / totalLeads) * 100).toFixed(1);

  // Your Lead model doesn't have a revenue/value field yet
  const revenuePipeline = 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back. Here&apos;s what&apos;s happening with your pipeline
          today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          change={0}
          color="text-blue-600"
        />

        <StatsCard
          title="Active Opportunities"
          value={activeOpportunities}
          icon={Activity}
          change={0}
          color="text-amber-500"
        />

        <StatsCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={TrendingUp}
          change={0}
          color="text-purple-500"
        />

        <StatsCard
          title="Revenue Pipeline"
          value={formatCurrency(revenuePipeline)}
          icon={DollarSign}
          change={0}
          color="text-green-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] xl:items-stretch">
        <PipelineOverview leads={leads} />
        <QuickActions />
      </div>

      <RecentLeads leads={leads} />
    </div>
  );
}