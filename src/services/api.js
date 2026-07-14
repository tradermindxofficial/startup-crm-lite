import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * Configure Axios Client Instance.
 * Sets the baseURL dynamically from environment variables, fallback to local port 5000 in dev.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

/**
 * Request Interceptor.
 * Automatically injects the Authorization Bearer token into outgoing HTTP requests if present in localStorage.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor.
 * Catch responses to clear expired tokens (returning 401) or display network failure prompts on communication block.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized denotes expired or malformed session token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('crm-token');
      // Force redirect to login layout. Use replace to prevent page back-history loops.
      window.location.href = '/login';
    } 
    // Absence of error.response represents network connection loss
    else if (!error.response) {
      toast.error('Cannot connect to server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
