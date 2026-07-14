import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import leadService from '../services/leadService.js';
import { useAuth } from './AuthContext.jsx';

export const LeadContext = createContext(null);

/**
 * LeadProvider component hosting global state for CRM Leads.
 * Handles API calls, mapping MongoDB ObjectIds, and managing pagination states.
 */
export function LeadProvider({ children }) {
  const [leads, setLeadsState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0,
  });
  const { token } = useAuth();

  /**
   * Helper utility to normalize backend MongoDB documents.
   * Maps _id to id for seamless compatibility with UI components expecting localStorage shapes.
   * 
   * @param {Array|Object} data - Lead document(s) from API.
   * @returns {Array|Object} Normalized document(s).
   */
  const normalize = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
    }
    if (data && typeof data === 'object') {
      return {
        ...data,
        id: data._id || data.id,
      };
    }
    return data;
  };

  /**
   * Safe state updater that normalizes leads before storing.
   */
  const setLeads = (data) => {
    setLeadsState(normalize(data));
  };

  /**
   * Query leads dataset from the API using filter parameters.
   * 
   * @param {Object} [params] - Query options (search, status, page, etc.).
   */
  const fetchLeads = async (params) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads(params);
      if (response && response.success) {
        setLeads(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch initial leads dataset if user session is active
  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setLeads([]);
    }
  }, [token]);

  /**
   * Create a new lead record via API.
   * 
   * @param {Object} leadData - Lead attributes.
   */
  const addLead = async (leadData) => {
    try {
      const response = await leadService.createLead(leadData);
      if (response && response.success) {
        const newLead = normalize(response.data);
        setLeadsState((prev) => [newLead, ...prev]);
        toast.success('Lead created successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create lead');
      throw error;
    }
  };

  /**
   * Update an existing lead record.
   * Supports either full field updates or single PATCH status changes.
   * 
   * @param {string} id - Lead ID.
   * @param {Object} updatedFields - Fields to update.
   */
  const updateLead = async (id, updatedFields) => {
    try {
      let response;
      const keys = Object.keys(updatedFields);
      
      // Call single status PATCH if only status was updated
      if (keys.length === 1 && keys[0] === 'status') {
        response = await leadService.updateLeadStatus(id, updatedFields.status);
      } else {
        response = await leadService.updateLead(id, updatedFields);
      }

      if (response && response.success) {
        const updatedLead = normalize(response.data);
        setLeadsState((prev) =>
          prev.map((l) => (l.id === id || l._id === id ? updatedLead : l))
        );
        toast.success('Lead updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
      throw error;
    }
  };

  /**
   * Delete a lead by its ID.
   * 
   * @param {string} id - Lead ID.
   */
  const deleteLead = async (id) => {
    try {
      const response = await leadService.deleteLead(id);
      if (response && response.success) {
        setLeadsState((prev) => prev.filter((l) => l.id !== id && l._id !== id));
        toast.success('Lead deleted successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
      throw error;
    }
  };

  /**
   * Find a lead locally from the active state by its ID.
   * 
   * @param {string} id - Lead ID.
   * @returns {Object|undefined} Lead object if found.
   */
  const getLeadById = (id) => {
    return leads.find((l) => l.id === id || l._id === id);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        fetchLeads,
        addLead,
        updateLead,
        deleteLead,
        getLeadById,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom React hook to consume the LeadContext.
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
