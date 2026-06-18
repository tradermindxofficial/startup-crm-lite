/**
 * Sample leads database for initializing the Startup CRM Lite application.
 * Includes analytics-ready fields for dashboard visualizations.
 */
const owners = ["Sarah", "Alex", "David", "Priya"];
const sources = ["Website", "Referral", "LinkedIn", "Instagram", "Ads", "Cold Email"];
const statuses = ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"];

const createLead = (index, overrides = {}) => {
  const monthOffset = index % 6;
  const day = (index % 27) + 1;
  const createdAt = new Date(2026, 5 - monthOffset, day, 10, 30, 0);
  const status = statuses[index % statuses.length];
  const value = 15000 + (index % 8) * 12500;
  const owner = owners[index % owners.length];

  const lead = {
    id: `lead-${index + 1}`,
    name: `Lead ${index + 1}`,
    company: `Company ${index + 1}`,
    email: `lead${index + 1}@example.com`,
    phone: `+91 98${String(10000000 + index).slice(0, 8)}`,
    status,
    source: sources[index % sources.length],
    value,
    owner,
    createdAt: createdAt.toISOString(),
    dateAdded: createdAt.toISOString().slice(0, 10),
    contactedAt: null,
    meetingAt: null,
    proposalAt: null,
    wonAt: null,
    ...overrides,
  };

  if (["Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"].includes(status)) {
    lead.contactedAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString();
  }
  if (["Meeting Scheduled", "Proposal Sent", "Won", "Lost"].includes(status)) {
    lead.meetingAt = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
  }
  if (["Proposal Sent", "Won", "Lost"].includes(status)) {
    lead.proposalAt = new Date(createdAt.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString();
  }
  if (status === "Won") {
    lead.wonAt = new Date(createdAt.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString();
  }

  return lead;
};

export const sampleLeads = [
  createLead(0, {
    name: "Aarav Mehta",
    company: "Mehta Tech Solutions",
    email: "aarav@mehtatech.in",
    status: "New",
    source: "LinkedIn",
    value: 25000,
    owner: "Sarah",
  }),
  createLead(1, {
    name: "Ananya Sharma",
    company: "Sharma Consulting",
    email: "ananya@sharmaconsulting.com",
    status: "New",
    source: "Website",
    value: 18000,
    owner: "Alex",
  }),
  createLead(2, {
    name: "Rohan Patel",
    company: "Patel Enterprises",
    email: "rohan@patelent.co.in",
    status: "Contacted",
    source: "Referral",
    value: 42000,
    owner: "David",
  }),
  createLead(3, {
    name: "Priya Nair",
    company: "Nair Edutech",
    email: "priya@nairedu.org",
    status: "Meeting Scheduled",
    source: "Ads",
    value: 36000,
    owner: "Priya",
  }),
  createLead(4, {
    name: "Vikram Singh",
    company: "Singh Logistics",
    email: "vikram@singhlogistics.com",
    status: "Won",
    source: "Cold Email",
    value: 95000,
    owner: "Sarah",
  }),
  createLead(5, {
    name: "Diya Sen",
    company: "Sen Creative Agency",
    email: "diya@sencreative.in",
    status: "Lost",
    source: "Instagram",
    value: 22000,
    owner: "Alex",
  }),
  ...Array.from({ length: 118 }, (_, index) => createLead(index + 6)),
];

export default sampleLeads;
