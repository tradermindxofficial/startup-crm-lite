/* src/utils/analyticsHelpers.js */

/**
 * Exact status string → display label + chart color.
 * Covers both short form and long form status names.
 */
export const STATUS_META = {
  New:                { label: "New",       color: "#94A3B8" },
  Contacted:          { label: "Contacted", color: "#2563EB" },
  "Meeting Scheduled":{ label: "Meeting",   color: "#F59E0B" },
  "Proposal Sent":    { label: "Proposal",  color: "#7C3AED" },
  Won:                { label: "Won",        color: "#22C55E" },
  Lost:               { label: "Lost",       color: "#EF4444" },
};

/** Shorthand color map (used by cells in charts) */
export const STATUS_COLORS = Object.fromEntries(
  Object.entries(STATUS_META).map(([k, v]) => [k, v.color])
);

/**
 * Status distribution for the PieChart.
 * @param {Array} leads
 * @returns {{ name: string, displayName: string, value: number, percent: string, color: string }[]}
 */
export function getStatusDistribution(leads) {
  const total = leads.length || 1;
  const counts = {};
  leads.forEach((lead) => {
    const s = lead.status ?? "New";
    counts[s] = (counts[s] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({
    name,
    displayName: STATUS_META[name]?.label ?? name,
    value,
    percent: ((value / total) * 100).toFixed(1),
    color: STATUS_META[name]?.color ?? "#777777",
  }));
}

/**
 * Monthly lead counts – last 6 months.
 * @param {Array} leads
 * @returns {{ month: string, count: number }[]}
 */
export function getMonthlyLeads(leads) {
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      month: d.toLocaleString("default", { month: "short" }),
      key: `${d.getFullYear()}-${d.getMonth() + 1}`,
      count: 0,
    };
  });

  const map = Object.fromEntries(months.map((m) => [m.key, m]));
  leads.forEach((lead) => {
    if (!lead.createdAt) return;
    const d = new Date(lead.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    if (map[key]) map[key].count += 1;
  });

  return months.map((m) => ({ month: m.month, count: m.count }));
}

/**
 * Monthly conversion rate (Won / total × 100) – last 6 months.
 * @param {Array} leads
 * @returns {{ month: string, rate: number }[]}
 */
export function getConversionByMonth(leads) {
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      month: d.toLocaleString("default", { month: "short" }),
      key: `${d.getFullYear()}-${d.getMonth() + 1}`,
      total: 0,
      won: 0,
    };
  });

  const map = Object.fromEntries(months.map((m) => [m.key, m]));
  leads.forEach((lead) => {
    if (!lead.createdAt) return;
    const d = new Date(lead.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    if (!map[key]) return;
    map[key].total += 1;
    if (lead.status === "Won") map[key].won += 1;
  });

  return months.map((m) => ({
    month: m.month,
    rate: m.total ? parseFloat(((m.won / m.total) * 100).toFixed(1)) : 0,
  }));
}

/**
 * Compute summary stats for the Analytics header.
 * @param {Array} leads
 * @returns {{ total: number, wonRate: string, avgCloseDays: string }}
 */
export function getSummaryStats(leads) {
  const total = leads.length;
  const wonLeads = leads.filter((l) => l.status === "Won");
  const won = wonLeads.length;
  const wonRate = total ? ((won / total) * 100).toFixed(1) : "0";

  let totalDays = 0;
  let counted = 0;
  wonLeads.forEach((l) => {
    const created = new Date(l.createdAt);
    const closed = l.closedAt
      ? new Date(l.closedAt)
      : l.updatedAt
      ? new Date(l.updatedAt)
      : null;
    if (created && closed && !isNaN(created) && !isNaN(closed)) {
      totalDays += (closed - created) / (1000 * 60 * 60 * 24);
      counted += 1;
    }
  });

  const avgCloseDays = counted ? (totalDays / counted).toFixed(1) : null;
  return { total, wonRate, avgCloseDays };
}
