/**
 * @fileoverview Mobile-friendly card component to display a single lead.
 */
import React from "react";
import { Building2, Calendar, Edit2, Globe2, Mail, Phone, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function LeadCard({ lead, onEdit, onDelete }) {
  const formattedDate = lead.dateAdded
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(lead.dateAdded))
    : "Not added";

  return (
    <div className="flex min-h-[280px] flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Building2 size={14} className="shrink-0 text-gray-400" />
            <p className="truncate">{lead.company}</p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Mail size={16} className="shrink-0 text-gray-400" />
          <a href={`mailto:${lead.email}`} className="truncate hover:text-blue-600">
            {lead.email}
          </a>
        </div>
        {lead.phone ? (
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Phone size={16} className="shrink-0 text-gray-400" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
              {lead.phone}
            </a>
          </div>
        ) : null}
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Globe2 size={16} className="shrink-0 text-gray-400" />
          <span>
            Source: <span className="font-medium text-gray-700 dark:text-gray-300">{lead.source || "Unknown"}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={16} className="shrink-0 text-gray-300 dark:text-gray-600" />
          <span>Added: {formattedDate}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-gray-100 pt-3 dark:border-gray-800">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30"
            aria-label={`Edit ${lead.name}`}
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(lead.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/30"
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
