/**
 * @fileoverview Desktop-friendly table component to display all leads.
 */
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{lead.name}</td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.company}</td>
              <td className="py-3 px-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">{lead.email}</a>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.source}</td>
              <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{lead.dateAdded}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(lead)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                    aria-label={`Edit ${lead.name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(lead.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                    aria-label={`Delete ${lead.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={7} className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No leads found. Create your first lead to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
