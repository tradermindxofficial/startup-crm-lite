/**
 * @fileoverview Main Leads page with CRUD operations, search, and status filtering.
 */
import React, { useState, useEffect } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import LeadTable from "../components/leads/LeadTable";
import LeadCard from "../components/leads/LeadCard";
import LeadForm from "../components/leads/LeadForm";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";
import { useLeads } from "../context/LeadContext";

const useResponsiveViewMode = () => {
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateViewMode = () => {
      if (desktopQuery.matches) setViewMode("table");
    };

    updateViewMode();
    desktopQuery.addEventListener("change", updateViewMode);
    return () => desktopQuery.removeEventListener("change", updateViewMode);
  }, []);

  return [viewMode, setViewMode];
};

export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useResponsiveViewMode();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (location.state?.openAddModal) {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredLeads = leads
    .filter((lead) => activeFilter === "All" || lead.status === activeFilter)
    .filter((lead) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
      );
    });

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
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
    if (window.confirm("Are you sure you want to delete this lead?")) {
      deleteLead(id);
      toast.error("Lead deleted", { icon: "🗑️" });
    }
  };

  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success("Lead updated successfully");
    } else {
      addLead(formData);
      toast.success("Lead added successfully");
    }
    setIsModalOpen(false);
  };

  const showEmptyState = filteredLeads.length === 0;

  return (
    <div className="space-y-5">
      <Toaster position="top-right" />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Leads Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and manage your potential customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tablet only: card/table toggle */}
          <div className="hidden items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex lg:hidden">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-gray-100 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
              aria-label="Table view"
            >
              <List size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
                viewMode === "card"
                  ? "bg-gray-100 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
              aria-label="Card view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddClick}
            className="flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
      </div>

      {!showEmptyState && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">{filteredLeads.length}</span> of{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">{leads.length}</span> leads
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {showEmptyState ? (
          <EmptyState
            totalLeads={leads.length}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Mobile: card view only */}
            <div className="space-y-4 p-4 md:hidden">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleEditClick} onDelete={handleDelete} />
              ))}
            </div>

            {/* Tablet: hybrid toggle */}
            <div className="hidden md:block lg:hidden">
              {viewMode === "table" ? (
                <LeadTable leads={filteredLeads} onEdit={handleEditClick} onDelete={handleDelete} compact />
              ) : (
                <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 dark:bg-gray-900/50 sm:grid-cols-2">
                  {filteredLeads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} onEdit={handleEditClick} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: full table */}
            <div className="hidden lg:block">
              <LeadTable leads={filteredLeads} onEdit={handleEditClick} onDelete={handleDelete} />
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex bg-gray-900/50 backdrop-blur-sm md:items-center md:justify-center md:p-4">
          <div className="flex h-full w-full flex-col overflow-hidden bg-white dark:bg-gray-900 md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:border md:border-gray-200 md:shadow-xl dark:md:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedLead ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
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
