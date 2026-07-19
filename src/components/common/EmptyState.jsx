/**
 * @fileoverview EmptyState component for when no leads match search/filter criteria.
 */
import React from 'react';
import { SearchX, Users } from 'lucide-react';

/**
 * Renders an empty state message.
 * @param {object} props
 * @param {number} props.totalLeads - Total number of leads in the system (before filtering).
 * @param {string} props.searchQuery - The current search query string.
 * @param {string} props.activeFilter - The currently active status filter.
 * @param {function} props.onClearFilters - Callback to clear all search/filter state.
 */
export default function EmptyState({ totalLeads, searchQuery, activeFilter, onClearFilters }) {
  const isFiltered = searchQuery || activeFilter !== 'All';

  if (totalLeads === 0) {
    // Completely empty database — prompt the user to create a lead
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Users className="w-7 h-7 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          No leads yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Get started by adding your first lead. Track contacts, companies, and your sales pipeline all in one place.
        </p>
      </div>
    );
  }

  // Leads exist but none match the current search/filter
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {isFiltered ? "No matching leads found." : "No leads found"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-5">
        {searchQuery && activeFilter !== 'All'
          ? `No "${activeFilter}" leads match "${searchQuery}". Try adjusting your search or filter.`
          : searchQuery
          ? `No leads match "${searchQuery}". Try a different name, company, or email.`
          : `No leads with status "${activeFilter}". Try selecting a different filter.`}
      </p>
      {isFiltered && (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
