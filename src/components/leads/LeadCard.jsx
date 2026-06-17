/**
 * @fileoverview Mobile-friendly card component to display a single lead.
 */
import React from 'react';
import { Mail, Phone, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <div className="mr-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{lead.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      
      <div className="space-y-2 mb-4 flex-1">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Mail size={14} className="mr-2 shrink-0" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 truncate">{lead.email}</a>
        </div>
        {lead.phone && (
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Phone size={14} className="mr-2 shrink-0" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone}</a>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">Added {lead.dateAdded}</span>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(lead)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
            aria-label={`Edit ${lead.name}`}
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(lead.id)}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
