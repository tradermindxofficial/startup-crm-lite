/**
 * @fileoverview Quick action buttons for the dashboard.
 */

import { Plus, ListFilter, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';

const CSV_COLUMNS = [
  { label: 'Name', value: 'name' },
  { label: 'Company', value: 'company' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Status', value: 'status' },
  { label: 'Source', value: 'source' },
  { label: 'Date Added', value: 'dateAdded' },
  { label: 'Created At', value: 'createdAt' },
];

function escapeCsvValue(value) {
  const text = value == null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function buildLeadsCsv(leads) {
  const header = CSV_COLUMNS.map((column) => escapeCsvValue(column.label)).join(',');
  const rows = leads.map((lead) =>
    CSV_COLUMNS.map((column) => escapeCsvValue(lead[column.value])).join(',')
  );

  return [header, ...rows].join('\r\n');
}

/**
 * Renders a set of quick action buttons (Add Lead, View All, Export).
 * 
 * @returns {JSX.Element} The rendered QuickActions component.
 */
export default function QuickActions() {
  const { leads } = useLeads();

  const handleExportData = () => {
    const csv = buildLeadsCsv(leads);
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];

    link.href = url;
    link.download = `startup-crm-leads-${today}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        {/* Add New Lead Button */}
        <Link 
          to="/leads" 
          state={{ openAddModal: true }} 
          className="flex min-h-11 w-full items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={16} />
          Add New Lead
        </Link>
        
        {/* View All Leads Link */}
        <Link to="/leads" className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          <ListFilter size={16} />
          View All Leads
        </Link>
        
        {/* Export Data Button */}
        <button
          type="button"
          onClick={handleExportData}
          disabled={leads.length === 0}
          className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Download size={16} />
          Export Data
        </button>
      </div>
    </div>
  );
}
