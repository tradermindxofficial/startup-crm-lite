import api from './api.js';

/**
 * Lead service handling CRUD operations, analytics aggregation, and updates.
 */
const leadService = {
  /**
   * Fetch leads with optional filter and search parameters.
   * 
   * @param {Object} [params] - Query parameters (status, search, page, limit, sortBy, sortOrder).
   * @returns {Promise<Object>} API paginated results payload.
   */
  getLeads: async (params) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Create a new lead record.
   * 
   * @param {Object} leadData - Lead attributes.
   * @returns {Promise<Object>} Created Lead object.
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Update all fields of an existing lead record.
   * 
   * @param {string} id - Lead Mongoose ObjectId.
   * @param {Object} leadData - Updated lead attributes.
   * @returns {Promise<Object>} Updated Lead object.
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Partially update only the pipeline status of a lead.
   * 
   * @param {string} id - Lead Mongoose ObjectId.
   * @param {string} status - New pipeline status value.
   * @returns {Promise<Object>} Updated Lead object.
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a lead by its unique identifier.
   * 
   * @param {string} id - Lead Mongoose ObjectId.
   * @returns {Promise<Object>} Deletion confirmation payload.
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Retrieve total KPIs and status count metrics.
   * 
   * @returns {Promise<Object>} Aggregated status counts and conversion rate statistics.
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats/summary');
    return response.data;
  },

  /**
   * Retrieve month-by-month trends for the preceding 6 months.
   * 
   * @returns {Promise<Array>} List of month aggregates for Recharts components.
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/stats/monthly');
    return response.data;
  },
};

export default leadService;
