import React, { useCallback, useEffect, useState } from "react";
import { useLeads } from "../context/LeadContext";
import useAnalytics from "../hooks/useAnalytics";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import StatsCards from "../components/analytics/StatsCards";
import PieChartCard from "../components/analytics/PieChartCard";
import FunnelChartCard from "../components/analytics/FunnelChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";
import RevenueChartCard from "../components/analytics/RevenueChartCard";
import LeadSourceChart from "../components/analytics/LeadSourceChart";
import SalesVelocityCard from "../components/analytics/SalesVelocityCard";
import ForecastCard from "../components/analytics/ForecastCard";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";
import TopPerformersCard from "../components/analytics/TopPerformersCard";
import EmptyAnalyticsState from "../components/analytics/EmptyAnalyticsState";
import LoadingSkeleton from "../components/analytics/LoadingSkeleton";

const Analytics = () => {
  const { leads, heatmapData } = useLeads();
  const [activeFilter, setActiveFilter] = useState("last30");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const analytics = useAnalytics(leads, activeFilter, customRange);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBootstrapping(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const handleFilterChange = useCallback((filterKey) => {
    setActiveFilter(filterKey);
  }, []);

  const handleCustomRangeChange = useCallback((range) => {
    setCustomRange(range);
  }, []);

  if (isBootstrapping) {
    return <LoadingSkeleton />;
  }

  if (!leads?.length) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track sales performance and growth trends.
          </p>
        </div>
        <AnalyticsFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          customRange={customRange}
          onCustomRangeChange={handleCustomRangeChange}
        />
      </div>

      <StatsCards stats={analytics.stats} growth={analytics.growth} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <PieChartCard data={analytics.charts.statusDistribution} totalLeads={analytics.stats.totalLeads} />
        <FunnelChartCard data={analytics.charts.funnelData} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <BarChartCard data={analytics.charts.monthlyLeads} />
        <LineChartCard data={analytics.charts.conversionByMonth} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <RevenueChartCard data={analytics.charts.revenueByMonth} />
        <LeadSourceChart data={analytics.charts.leadSourceStats} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ActivityHeatmap data={heatmapData} />
        <TopPerformersCard performers={analytics.widgets.topPerformers} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ForecastCard forecast={analytics.widgets.forecast} />
        <SalesVelocityCard
          velocityData={analytics.widgets.salesVelocity}
          trend={analytics.growth.salesVelocity}
        />
      </div>
    </div>
  );
};

export default Analytics;
