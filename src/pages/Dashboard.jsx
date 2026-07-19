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
import { 
  getPipelineValue, 
  getAverageDealValue, 
  getHighestDealValue, 
  formatCurrency 
} from "../utils/analyticsHelpers";

export default function Dashboard() {
  const { leads } = useLeads();

  // Dashboard statistics computed dynamically
  const totalLeads = leads.length;
  const revenuePipeline = getPipelineValue(leads);
  const averageDeal = getAverageDealValue(leads);
  const highestDeal = getHighestDealValue(leads);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back. Here&apos;s what&apos;s happening with your pipeline today.
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
          title="Revenue Pipeline"
          value={formatCurrency(revenuePipeline)}
          icon={DollarSign}
          change={0}
          color="text-green-500"
        />

        <StatsCard
          title="Average Deal"
          value={formatCurrency(averageDeal)}
          icon={Activity}
          change={0}
          color="text-amber-500"
        />

        <StatsCard
          title="Highest Deal"
          value={formatCurrency(highestDeal)}
          icon={TrendingUp}
          change={0}
          color="text-purple-500"
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