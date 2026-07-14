import api from './api.js';

/**
 * Authentication service handling credentials registry and session updates.
 */
const authService = {
  /**
   * Register a new user.
   * 
   * @param {string} name - User's full name.
   * @param {string} email - User's email.
   * @param {string} password - Plain text password.
   * @returns {Promise<Object>} The API response payload data containing user profile and token.
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Log in an existing user.
   * 
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} The API response payload data containing user profile and token.
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Log out the current user by removing credentials locally.
   * The backend API is stateless, so this is resolved entirely client-side.
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },

  /**
   * Fetch profile details of the current authenticated user.
   * 
   * @returns {Promise<Object>} User profile object.
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Update name or password parameters on the current authenticated user's profile.
   * 
   * @param {Object} data - Profile updates, including name, oldPassword, or newPassword.
   * @returns {Promise<Object>} Updated User object.
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};

export default authService;
