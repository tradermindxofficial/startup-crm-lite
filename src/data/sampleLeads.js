/**
 * Sample leads database for initializing the Startup CRM Lite application.
 * Contains realistic Indian names, companies, and varied pipeline statuses.
 * Includes both ISO createdAt and dateAdded fields for full system compatibility.
 * 
 * Shape of Lead object:
 * {
 *   id: string,
 *   name: string,
 *   company: string,
 *   email: string,
 *   phone: string,
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost',
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other',
 *   createdAt: string, // ISO date string
 *   dateAdded: string  // YYYY-MM-DD
 * }
 */
export const sampleLeads = [
  {
    id: 'lead-1',
    name: 'Aarav Mehta',
    company: 'Mehta Tech Solutions',
    email: 'aarav@mehtatech.in',
    phone: '+91 98765 43210',
    status: 'New',
    source: 'LinkedIn',
    createdAt: '2026-06-15T10:30:00.000Z',
    dateAdded: '2026-06-15',
  },
  {
    id: 'lead-2',
    name: 'Ananya Sharma',
    company: 'Sharma Consulting',
    email: 'ananya@sharmaconsulting.com',
    phone: '+91 91234 56789',
    status: 'New',
    source: 'Website',
    createdAt: '2026-06-16T14:15:00.000Z',
    dateAdded: '2026-06-16',
  },
  {
    id: 'lead-3',
    name: 'Rohan Patel',
    company: 'Patel Enterprises',
    email: 'rohan@patelent.co.in',
    phone: '+91 88888 77777',
    status: 'Contacted',
    source: 'Referral',
    createdAt: '2026-06-14T09:00:00.000Z',
    dateAdded: '2026-06-14',
  },
  {
    id: 'lead-4',
    name: 'Priya Nair',
    company: 'Nair Edutech',
    email: 'priya@nairedu.org',
    phone: '+91 77777 66666',
    status: 'Meeting Scheduled',
    source: 'Email Campaign',
    createdAt: '2026-06-12T11:45:00.000Z',
    dateAdded: '2026-06-12',
  },
  {
    id: 'lead-5',
    name: 'Vikram Singh',
    company: 'Singh Logistics',
    email: 'vikram@singhlogistics.com',
    phone: '+91 99999 88888',
    status: 'Won',
    source: 'Cold Call',
    createdAt: '2026-06-10T16:20:00.000Z',
    dateAdded: '2026-06-10',
  },
  {
    id: 'lead-6',
    name: 'Diya Sen',
    company: 'Sen Creative Agency',
    email: 'diya@sencreative.in',
    phone: '+91 95555 44444',
    status: 'Lost',
    source: 'Other',
    createdAt: '2026-06-08T13:10:00.000Z',
    dateAdded: '2026-06-08',
  },
];

export default sampleLeads;
