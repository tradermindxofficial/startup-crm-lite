/**
 * @fileoverview Main Leads page with CRUD operations, search, and status filtering.
 */
import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

// Lead sub-components
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';

// Common components
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

import { useLeads } from '../context/LeadContext';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'

  const location = useLocation();

  useEffect(() => {
    if (location.state?.openAddModal) {
      setIsModalOpen(true);
      // Clean up location state to prevent reopening on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // ---------------------------------------------------------------------------
  // Derived: filteredLeads applies status filter then search query
  // ---------------------------------------------------------------------------
  const filteredLeads = leads
    .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
    .filter(lead => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
      );
    });

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  const handleAddClick = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted', { icon: '🗑️' });
    }
  };

  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully');
    } else {
      addLead(formData);
      toast.success('Lead added successfully');
    }
    setIsModalOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const showEmptyState = filteredLeads.length === 0;

  return (
    <div className="space-y-5">
      {/* React Hot Toast container */}
      <Toaster position="top-right" />

      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Leads Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track and manage your potential customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle — desktop only */}
          <div className="hidden sm:flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-1 shadow-sm">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
              aria-label="Table view"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'card'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
              aria-label="Card view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>
      </div>

      {/* ── Search + Filter toolbar ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          leads={leads}
        />
      </div>

      {/* ── Results summary ─────────────────────────────────────────────────── */}
      {!showEmptyState && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {filteredLeads.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {leads.length}
          </span>{' '}
          leads
        </p>
      )}

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
        {showEmptyState ? (
          <EmptyState
            totalLeads={leads.length}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Mobile: always card grid */}
            <div className="block sm:hidden p-4 space-y-4">
              {filteredLeads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Desktop: table or card view based on viewMode toggle */}
            <div className="hidden sm:block">
              {viewMode === 'table' ? (
                <LeadTable
                  leads={filteredLeads}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-900/50">
                  {filteredLeads.map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onEdit={handleEditClick}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Add / Edit Modal ────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
            </div>
            <div className="p-6">
              <LeadForm
                initialData={selectedLead}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}