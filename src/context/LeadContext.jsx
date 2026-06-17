import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import sampleLeads from '../data/sampleLeads';

/**
 * TypeScript-style shape of the Lead object.
 * 
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier for the lead.
 * @property {string} name - Contact name of the lead.
 * @property {string} company - Company name associated with the lead.
 * @property {string} email - Email address of the lead.
 * @property {string} phone - Phone number of the lead.
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Pipeline status.
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Lead acquisition source.
 * @property {string} createdAt - ISO date-time string when the lead was created.
 * @property {string} dateAdded - Date string (YYYY-MM-DD) for backward compatibility with UI views.
 */

/**
 * @typedef {Object} LeadContextType
 * @property {Lead[]} leads - Array of leads.
 * @property {function(Omit<Lead, 'id' | 'createdAt' | 'dateAdded'>): void} addLead - Adds a new lead.
 * @property {function(string, Partial<Lead>): void} updateLead - Updates an existing lead.
 * @property {function(string): void} deleteLead - Deletes a lead by its ID.
 * @property {function(string): Lead | undefined} getLeadById - Finds a lead by its ID.
 */

/** @type {React.Context<LeadContextType | null>} */
export const LeadContext = createContext(null);

/**
 * LeadProvider component that wraps the application and hosts the global leads state.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} The rendered provider element.
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead. Generates a unique ID and appends creation dates.
   * 
   * @param {Omit<Lead, 'id' | 'createdAt' | 'dateAdded'>} leadData - Lead details.
   * @returns {void}
   */
  const addLead = (leadData) => {
    const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString();
    const createdAt = new Date().toISOString();
    const dateAdded = createdAt.split('T')[0];
    
    const newLead = {
      ...leadData,
      id,
      createdAt,
      dateAdded,
    };
    
    setLeads((prev) => [newLead, ...prev]);
  };

  /**
   * Updates an existing lead in-place.
   * 
   * @param {string} id - Unique identifier of the lead to update.
   * @param {Partial<Lead>} updatedFields - Fields to modify.
   * @returns {void}
   */
  const updateLead = (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
    );
  };

  /**
   * Deletes a lead by its unique ID.
   * 
   * @param {string} id - The ID of the lead to remove.
   * @returns {void}
   */
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  /**
   * Retrieves a lead from the current state by its unique ID.
   * 
   * @param {string} id - The ID of the lead.
   * @returns {Lead | undefined} The matching lead object or undefined.
   */
  const getLeadById = (id) => {
    return leads.find((l) => l.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom React hook to consume the Leads context.
 * Throws a descriptive runtime error if invoked outside of a LeadProvider context scope.
 * 
 * @returns {LeadContextType} The verified LeadContext values.
 * @throws {Error} If context is consumed outside of LeadProvider.
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider. Make sure the component is wrapped by <LeadProvider>.');
  }
  return context;
}
