/**
 * @fileoverview Mobile-friendly card component to display a single lead.
 */
import React from "react";
import { Mail, Phone, Edit2, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mb-4 flex-1 space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Mail size={14} className="mr-2 shrink-0" />
          <a href={`mailto:${lead.email}`} className="truncate hover:text-blue-600">
            {lead.email}
          </a>
        </div>
        {lead.phone ? (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Phone size={14} className="mr-2 shrink-0" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
              {lead.phone}
            </a>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs text-gray-400 dark:text-gray-500">Added {lead.dateAdded}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
            aria-label={`Edit ${lead.name}`}
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(lead.id)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
