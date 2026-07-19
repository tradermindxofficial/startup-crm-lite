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
  getAverageDealValue,
  getHighestDealValue,
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

    const totalLeads = leads.length;
    const wonCount = leads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
    const lostRate = getLostRate(leads);
    const conversionRate = totalLeads ? Number(((wonCount / totalLeads) * 100).toFixed(1)) : 0;
    const pipelineValue = getPipelineValue(leads);
    const wonRevenue = getWonRevenue(leads);
    const avgSalesCycle = getAverageSalesCycle(leads);
    const averageDeal = getAverageDealValue(leads);
    const highestDeal = getHighestDealValue(leads);

    // Period-filtered leads for growth calculations
    const currentTotalLeads = currentLeads.length;
    const previousTotalLeads = previousLeads.length;
    const currentWonCount = currentLeads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
    const previousWonCount = previousLeads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
    const currentLostRate = getLostRate(currentLeads);
    const previousLostRate = getLostRate(previousLeads);
    const currentConversionRate = currentTotalLeads ? Number(((currentWonCount / currentTotalLeads) * 100).toFixed(1)) : 0;
    const previousConversionRate = previousTotalLeads ? Number(((previousWonCount / previousTotalLeads) * 100).toFixed(1)) : 0;
    const currentPipelineValue = getPipelineValue(currentLeads);
    const previousPipelineValue = getPipelineValue(previousLeads);
    const currentWonRevenue = getWonRevenue(currentLeads);
    const previousWonRevenue = getWonRevenue(previousLeads);
    const currentAvgSalesCycle = getAverageSalesCycle(currentLeads);
    const previousAvgSalesCycle = getAverageSalesCycle(previousLeads);
    const currentAverageDeal = getAverageDealValue(currentLeads);
    const previousAverageDeal = getAverageDealValue(previousLeads);
    const currentHighestDeal = getHighestDealValue(currentLeads);
    const previousHighestDeal = getHighestDealValue(previousLeads);

    const salesVelocity = getSalesVelocity(leads);
    const currentSalesVelocityForGrowth = getSalesVelocity(currentLeads);
    const previousSalesVelocityForGrowth = getSalesVelocity(previousLeads);

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
        averageDeal,
        highestDeal,
      },
      growth: {
        totalLeads: calculateGrowth(currentTotalLeads, previousTotalLeads),
        conversionRate: calculateGrowth(currentConversionRate, previousConversionRate),
        pipelineValue: calculateGrowth(currentPipelineValue, previousPipelineValue),
        wonRevenue: calculateGrowth(currentWonRevenue, previousWonRevenue),
        avgSalesCycle: calculateGrowth(currentAvgSalesCycle, previousAvgSalesCycle),
        lostRate: calculateGrowth(currentLostRate, previousLostRate),
        averageDeal: calculateGrowth(currentAverageDeal, previousAverageDeal),
        highestDeal: calculateGrowth(currentHighestDeal, previousHighestDeal),
        salesVelocity: calculateGrowth(currentSalesVelocityForGrowth.velocity, previousSalesVelocityForGrowth.velocity),
      },
      charts: {
        statusDistribution: getStatusDistribution(currentLeads),
        funnelData: getFunnelData(currentLeads),
        monthlyLeads: getMonthlyLeads(leads),
        conversionByMonth: getConversionByMonth(leads),
        revenueByMonth: getRevenueByMonth(leads),
        leadSourceStats: getLeadSourceStats(leads),
        activityHeatmap: getActivityHeatmapData(leads),
      },
      widgets: {
        salesVelocity,
        forecast: getForecastRevenue(leads),
        topPerformers: getTopPerformers(leads),
      },
    };
  }, [leads, filter, customRange?.end, customRange?.start]);
}
