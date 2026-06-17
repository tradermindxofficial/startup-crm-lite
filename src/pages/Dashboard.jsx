/**
 * @fileoverview The main Dashboard page assembling all dashboard components.
 */

import React from 'react';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * Renders the main dashboard layout, passing sample data to child components.
 * Incorporates a responsive grid: 1 col on mobile, 2 on tablet, 4 on desktop.
 * 
 * @returns {JSX.Element} The rendered Dashboard page.
 */
export default function Dashboard() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back. Here's what's happening with your pipeline today.
        </p>
      </div>

      {/* Metrics Row: 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Leads" 
          value="1,248" 
          icon={Users} 
          change={12.5} 
          color="text-blue-600" 
        />
        <StatsCard 
          title="Active Opportunities" 
          value="84" 
          icon={Activity} 
          change={5.2} 
          color="text-amber-500" 
        />
        <StatsCard 
          title="Win Rate" 
          value="32.4%" 
          icon={TrendingUp} 
          change={-2.1} 
          color="text-purple-500" 
        />
        <StatsCard 
          title="Revenue Pipeline" 
          value="$2.4M" 
          icon={DollarSign} 
          change={18.4} 
          color="text-green-500" 
        />
      </div>

      {/* Main Content Area: Pipeline & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}