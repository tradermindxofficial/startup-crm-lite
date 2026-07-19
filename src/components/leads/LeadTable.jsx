/**
 * @fileoverview Desktop-friendly table component to display all leads.
 */
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatCurrency, formatDate } from "../../utils/analyticsHelpers";

export default function LeadTable({ leads, onEdit, onDelete, compact = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left lg:min-w-0">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Name
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Company
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Deal Value
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Email
            </th>
            {!compact && (
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Expected Close
              </th>
            )}
            <th
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                compact ? "hidden" : ""
              }`}
            >
              Source
            </th>
            <th
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                compact ? "hidden" : ""
              }`}
            >
              Date Added
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
          {leads.map((lead) => {
            const formattedCloseDate = lead.expectedCloseDate
              ? new Intl.DateTimeFormat("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(lead.expectedCloseDate))
              : "—";

            const formattedDate = formatDate(lead.createdAt || lead.dateAdded);

            return (
              <tr key={lead.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{lead.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{lead.company}</td>
                <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(lead.dealValue || 0)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="max-w-[12rem] truncate px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  <a href={`mailto:${lead.email}`} className="transition-colors hover:text-blue-600">
                    {lead.email}
                  </a>
                </td>
                {!compact && (
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {formattedCloseDate}
                  </td>
                )}
                <td className={`px-4 py-3 text-sm text-gray-600 dark:text-gray-300 ${compact ? "hidden" : ""}`}>
                  {lead.source}
                </td>
                <td className={`px-4 py-3 text-sm text-gray-500 dark:text-gray-400 ${compact ? "hidden" : ""}`}>
                  {formattedDate}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 cursor-pointer"
                      aria-label={`Edit ${lead.name}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(lead.id)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 cursor-pointer"
                      aria-label={`Delete ${lead.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {leads.length === 0 && (
            <tr>
              <td colSpan={compact ? 6 : 9} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No leads found. Create your first lead to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
