import { STATUS_COLORS, STATUS_ORDER } from "../constants/analyticsColors";

const SOURCE_ORDER = ["Website", "Referral", "LinkedIn", "Instagram", "Ads", "Cold Email"];

const safeDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toLocalISOString = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getLeadValue = (lead) => toNumber(lead?.dealValue ?? lead?.value);

export const normalizeStatus = (status) => {
  if (status === "Meeting Scheduled") return "Meeting";
  if (status === "Proposal Sent") return "Proposal";
  return STATUS_ORDER.includes(status) ? status : "New";
};

const rangeStart = (monthsBack, now = new Date()) => new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);

const createMonthSeries = (count = 6, now = new Date()) =>
  Array.from({ length: count }, (_, index) => {
    const date = rangeStart(count - 1 - index, now);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
    };
  });

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(toNumber(amount));

export const formatPercent = (value) => `${Number.isFinite(value) ? value.toFixed(1) : "0.0"}%`;

export const formatDate = (dateValue) => {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export function getStatusDistribution(leads = []) {
  const total = leads.length || 1;
  const counts = new Map(STATUS_ORDER.map((status) => [status, 0]));

  leads.forEach((lead) => {
    const status = normalizeStatus(lead?.status);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  });

  return STATUS_ORDER.map((status) => {
    const value = counts.get(status) ?? 0;
    return {
      name: status,
      value,
      percent: Number(((value / total) * 100).toFixed(1)),
      color: STATUS_COLORS[status],
    };
  }).filter((entry) => entry.value > 0);
}

export function getMonthlyLeads(leads = []) {
  const series = createMonthSeries(6);
  const buckets = new Map(series.map((item) => [item.key, { ...item, leads: 0 }]));

  leads.forEach((lead) => {
    const date = safeDate(lead?.createdAt);
    if (!date) return;
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!buckets.has(key)) return;
    buckets.get(key).leads += 1;
  });

  return series.map((item) => buckets.get(item.key));
}

export function getConversionByMonth(leads = []) {
  const series = createMonthSeries(6);
  const buckets = new Map(series.map((item) => [item.key, { ...item, total: 0, won: 0, conversionRate: 0 }]));

  leads.forEach((lead) => {
    const date = safeDate(lead?.createdAt);
    if (!date) return;
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!buckets.has(key)) return;
    const row = buckets.get(key);
    row.total += 1;
    if (normalizeStatus(lead?.status) === "Won") row.won += 1;
    row.conversionRate = row.total ? Number(((row.won / row.total) * 100).toFixed(1)) : 0;
  });

  return series.map((item) => buckets.get(item.key));
}

export function getRevenueByMonth(leads = []) {
  const series = createMonthSeries(6);
  const buckets = new Map(series.map((item) => [item.key, { ...item, revenue: 0 }]));

  leads.forEach((lead) => {
    if (normalizeStatus(lead?.status) !== "Won") return;
    const date = safeDate(lead?.wonAt ?? lead?.createdAt);
    if (!date) return;
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!buckets.has(key)) return;
    buckets.get(key).revenue += getLeadValue(lead);
  });

  return series.map((item) => buckets.get(item.key));
}

export function getPipelineValue(leads = []) {
  return leads.reduce((sum, lead) => {
    const status = normalizeStatus(lead?.status);
    if (status === "Won" || status === "Lost") return sum;
    return sum + getLeadValue(lead);
  }, 0);
}

export function getWonRevenue(leads = []) {
  return leads.reduce(
    (sum, lead) => (normalizeStatus(lead?.status) === "Won" ? sum + getLeadValue(lead) : sum),
    0
  );
}

export function getAverageSalesCycle(leads = []) {
  const wonLeads = leads.filter((lead) => normalizeStatus(lead?.status) === "Won");
  if (!wonLeads.length) return 0;

  let totalDays = 0;
  let count = 0;

  wonLeads.forEach((lead) => {
    const start = safeDate(lead?.createdAt);
    const end = safeDate(lead?.wonAt ?? lead?.closedAt ?? lead?.updatedAt);
    if (!start || !end) return;
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    if (diff >= 0) {
      totalDays += diff;
      count += 1;
    }
  });

  return count ? Number((totalDays / count).toFixed(1)) : 0;
}

export function getLostRate(leads = []) {
  if (!leads.length) return 0;
  const lost = leads.filter((lead) => normalizeStatus(lead?.status) === "Lost").length;
  return Number(((lost / leads.length) * 100).toFixed(1));
}

export function getLeadSourceStats(leads = []) {
  const sourceMap = new Map();

  leads.forEach((lead) => {
    const source = typeof lead?.source === "string" ? lead.source.trim() : "Other";
    sourceMap.set(source, (sourceMap.get(source) ?? 0) + 1);
  });

  return [...sourceMap.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFunnelData(leads = []) {
  const baseStages = ["New", "Contacted", "Meeting", "Proposal", "Won"];
  const stageCounts = Object.fromEntries(baseStages.map((stage) => [stage, 0]));

  leads.forEach((lead) => {
    const status = normalizeStatus(lead?.status);
    if (stageCounts[status] !== undefined) {
      stageCounts[status] += 1;
    }
  });

  return baseStages.map((stage, index) => {
    const count = stageCounts[stage];
    const prevCount = index === 0 ? count : stageCounts[baseStages[index - 1]];
    const conversion = prevCount ? Number(((count / prevCount) * 100).toFixed(1)) : 0;
    const dropOff = prevCount ? Number((100 - conversion).toFixed(1)) : 0;
    return { stage, count, conversion, dropOff };
  });
}

export function getSalesVelocity(leads = []) {
  const opportunities = leads.filter((lead) => !["Won", "Lost"].includes(normalizeStatus(lead?.status))).length;
  const total = leads.length;
  const wonCount = leads.filter((lead) => normalizeStatus(lead?.status) === "Won").length;
  const winRate = total ? wonCount / total : 0;
  const wonRevenue = getWonRevenue(leads);
  const avgDealSize = wonCount ? wonRevenue / wonCount : 0;
  const salesCycle = getAverageSalesCycle(leads) || 1;
  const velocity = (opportunities * winRate * avgDealSize) / salesCycle;

  return {
    opportunities,
    winRate: Number((winRate * 100).toFixed(1)),
    avgDealSize: Number(avgDealSize.toFixed(0)),
    salesCycle: Number(salesCycle.toFixed(1)),
    velocity: Number(velocity.toFixed(0)),
  };
}

export function getForecastRevenue(leads = []) {
  const wonLeads = leads.filter((lead) => normalizeStatus(lead?.status) === "Won");
  const hasWon = wonLeads.length > 0;

  const monthly = getRevenueByMonth(leads);
  const values = monthly.map((item) => item.revenue);
  const avg = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const latest = values[values.length - 1] ?? 0;
  const growth = latest ? Number((((avg - latest) / latest) * 100).toFixed(1)) : 0;
  const stableMonths = values.filter((value) => value > 0).length;
  const confidence = Math.min(95, 45 + stableMonths * 8);

  return {
    predictedRevenue: Number(avg.toFixed(0)),
    confidence,
    growth,
    hasForecast: hasWon,
  };
}

export function getTopPerformers(leads = []) {
  const map = new Map();
  leads.forEach((lead) => {
    if (normalizeStatus(lead?.status) !== "Won") return;
    const owner = lead?.owner || "Unassigned";
    map.set(owner, (map.get(owner) ?? 0) + getLeadValue(lead));
  });

  return [...map.entries()]
    .map(([owner, revenue]) => ({ owner, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

export function getActivityHeatmapData(leads = [], days = 120) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(today);
  firstDay.setDate(firstDay.getDate() - (days - 1));

  const dailyMap = new Map();
  for (let index = 0; index < days; index += 1) {
    const current = new Date(firstDay);
    current.setDate(firstDay.getDate() + index);
    const localIso = toLocalISOString(current);
    dailyMap.set(localIso, {
      date: localIso,
      created: 0,
      meetings: 0,
      calls: 0,
      proposals: 0,
      won: 0,
      lost: 0,
      edits: 0,
      total: 0,
    });
  }

  const updateCount = (dateString, key) => {
    const date = safeDate(dateString);
    if (!date) return;
    const localIso = toLocalISOString(date);
    const row = dailyMap.get(localIso);
    if (!row) return;
    row[key] += 1;
    row.total += 1;
  };

  leads.forEach((lead) => {
    updateCount(lead?.createdAt, "created");
    updateCount(lead?.contactedAt, "calls");
    updateCount(lead?.meetingAt, "meetings");
    updateCount(lead?.proposalAt, "proposals");
    updateCount(lead?.wonAt, "won");
    updateCount(lead?.lostAt, "lost");
    if (
      lead?.updatedAt &&
      lead?.createdAt &&
      new Date(lead.updatedAt).getTime() !== new Date(lead.createdAt).getTime()
    ) {
      updateCount(lead.updatedAt, "edits");
    }
  });

  return [...dailyMap.values()];
}

export function getAverageDealValue(leads = []) {
  if (!leads.length) return 0;
  const total = leads.reduce((sum, lead) => sum + getLeadValue(lead), 0);
  return total / leads.length;
}

export function getHighestDealValue(leads = []) {
  if (!leads.length) return 0;
  return Math.max(...leads.map((lead) => getLeadValue(lead)), 0);
}
