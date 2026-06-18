import { useMemo } from "react";
import {
  getActivityHeatmapData,
  getAverageSalesCycle,
  getConversionByMonth,
  getForecastRevenue,
  getFunnelData,
  getLeadSourceStats,
  getLostRate,
  getMonthlyLeads,
  getPipelineValue,
  getRevenueByMonth,
  getSalesVelocity,
  getStatusDistribution,
  getTopPerformers,
  getWonRevenue,
  normalizeStatus,
} from "../utils/analyticsHelpers";

const DAY_MS = 24 * 60 * 60 * 1000;

const toSafeDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getRangeFromFilter = (filterKey, customRange) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);

  switch (filterKey) {
    case "last7":
      start.setDate(end.getDate() - 6);
      break;
    case "last30":
      start.setDate(end.getDate() - 29);
      break;
    case "last90":
      start.setDate(end.getDate() - 89);
      break;
    case "thisYear":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "custom": {
      if (!customRange?.start || !customRange?.end) return { start: null, end: null };
      const customStart = toSafeDate(customRange.start);
      const customEnd = toSafeDate(customRange.end);
      if (!customStart || !customEnd) return { start: null, end: null };
      customStart.setHours(0, 0, 0, 0);
      customEnd.setHours(23, 59, 59, 999);
      return { start: customStart, end: customEnd };
    }
    default:
      return { start: null, end: null };
  }

  start.setHours(0, 0, 0, 0);
  return { start, end };
};

const getPreviousRange = (start, end) => {
  if (!start || !end) return { start: null, end: null };
  const diffDays = Math.max(1, Math.ceil((end - start + 1) / DAY_MS));
  const prevEnd = new Date(start.getTime() - DAY_MS);
  prevEnd.setHours(23, 59, 59, 999);
  const prevStart = new Date(prevEnd.getTime() - (diffDays - 1) * DAY_MS);
  prevStart.setHours(0, 0, 0, 0);
  return { start: prevStart, end: prevEnd };
};

const filterLeadsByRange = (leads, range) => {
  if (!range?.start || !range?.end) return leads;
  return leads.filter((lead) => {
    const createdAt = toSafeDate(lead?.createdAt ?? lead?.dateAdded);
    if (!createdAt) return false;
    return createdAt >= range.start && createdAt <= range.end;
  });
};

const calculateGrowth = (current, previous) => {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

export default function useAnalytics(leads = [], filter = "last30", customRange = null) {
  return useMemo(() => {
    const currentRange = getRangeFromFilter(filter, customRange);
    const previousRange = getPreviousRange(currentRange.start, currentRange.end);

    const currentLeads = filterLeadsByRange(leads, currentRange);
    const previousLeads = filterLeadsByRange(leads, previousRange);

    const totalLeads = currentLeads.length;
    const previousTotalLeads = previousLeads.length;
    const wonCount = currentLeads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
    const previousWonCount = previousLeads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
    const lostRate = getLostRate(currentLeads);
    const previousLostRate = getLostRate(previousLeads);
    const conversionRate = totalLeads ? Number(((wonCount / totalLeads) * 100).toFixed(1)) : 0;
    const previousConversionRate = previousTotalLeads
      ? Number(((previousWonCount / previousTotalLeads) * 100).toFixed(1))
      : 0;

    const pipelineValue = getPipelineValue(currentLeads);
    const previousPipelineValue = getPipelineValue(previousLeads);
    const wonRevenue = getWonRevenue(currentLeads);
    const previousWonRevenue = getWonRevenue(previousLeads);
    const avgSalesCycle = getAverageSalesCycle(currentLeads);
    const previousAvgSalesCycle = getAverageSalesCycle(previousLeads);
    const salesVelocity = getSalesVelocity(currentLeads);
    const previousSalesVelocity = getSalesVelocity(previousLeads);

    return {
      filteredLeads: currentLeads,
      currentRange,
      stats: {
        totalLeads,
        conversionRate,
        pipelineValue,
        wonRevenue,
        avgSalesCycle,
        lostRate,
      },
      growth: {
        totalLeads: calculateGrowth(totalLeads, previousTotalLeads),
        conversionRate: calculateGrowth(conversionRate, previousConversionRate),
        pipelineValue: calculateGrowth(pipelineValue, previousPipelineValue),
        wonRevenue: calculateGrowth(wonRevenue, previousWonRevenue),
        avgSalesCycle: calculateGrowth(avgSalesCycle, previousAvgSalesCycle),
        lostRate: calculateGrowth(lostRate, previousLostRate),
        salesVelocity: calculateGrowth(salesVelocity.velocity, previousSalesVelocity.velocity),
      },
      charts: {
        statusDistribution: getStatusDistribution(currentLeads),
        funnelData: getFunnelData(currentLeads),
        monthlyLeads: getMonthlyLeads(currentLeads),
        conversionByMonth: getConversionByMonth(currentLeads),
        revenueByMonth: getRevenueByMonth(currentLeads),
        leadSourceStats: getLeadSourceStats(currentLeads),
        activityHeatmap: getActivityHeatmapData(currentLeads),
      },
      widgets: {
        salesVelocity,
        forecast: getForecastRevenue(currentLeads),
        topPerformers: getTopPerformers(currentLeads),
      },
    };
  }, [leads, filter, customRange?.end, customRange?.start]);
}
