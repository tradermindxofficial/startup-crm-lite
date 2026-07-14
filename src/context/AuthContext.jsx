import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

/**
 * AuthProvider component that wraps the application and hosts the global authentication state.
 * Handles automatic login restore from local storage and encapsulates auth methods.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Restore authenticated session on mount if token is locally cached
  useEffect(() => {
    const restoreSession = async () => {
      if (token) {
        try {
          const profileData = await authService.getProfile();
          // Profile returns { success: true, data: { user } }
          if (profileData && profileData.success) {
            setUser(profileData.data);
          } else {
            // In case profileData format is direct data:
            setUser(profileData.data || profileData);
          }
        } catch (error) {
          // Token expired or invalid
          console.error('Session restoration failed:', error.message);
          localStorage.removeItem('crm-token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, [token]);

  /**
   * Log in user using credentials.
   * On success, saves token in localStorage, updates state and redirects to index path.
   * 
   * @param {string} email - Email address.
   * @param {string} password - Password.
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      // Response shape: { success: true, data: { token, user } }
      if (response && response.success && response.data) {
        const { token: userToken, user: userData } = response.data;
        localStorage.setItem('crm-token', userToken);
        setToken(userToken);
        setUser(userData);
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(message);
      throw error; // Re-throw to allow component-level form error handling
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user account.
   * On success, logs them in automatically and redirects to index path.
   * 
   * @param {string} name - Full name.
   * @param {string} email - Email address.
   * @param {string} password - Password.
   */
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.register(name, email, password);
      if (response && response.success && response.data) {
        const { token: userToken, user: userData } = response.data;
        localStorage.setItem('crm-token', userToken);
        setToken(userToken);
        setUser(userData);
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please check details.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user session.
   * Clears local states, clears localStorage, and redirects to login path.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom React hook to consume AuthContext attributes.
 * 
 * @returns {Object} Authentication state variables and functions.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
