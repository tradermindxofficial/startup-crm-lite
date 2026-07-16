import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Lazily load CRM pages to optimize chunk delivery size
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const HelpSupport = lazy(() => import('../pages/HelpSupport'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('../pages/TermsConditions'));

/**
 * Route protection guard.
 * Intercepts routing navigation and checks for active token session.
 * Displays temporary authentication state loader if loading is active.
 */
function ProtectedRoute() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        Verifying user credentials...
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * AppRoutes component configuring React Router paths.
 * Enforces session locks on dashboard, leads, analytics, profile, and settings components.
 */
export default function AppRoutes() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          Loading page...
        </div>
      }
    >
      <Routes>
        {/* Public Authenticity Endpoints */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Locked CRM Dashboard and Pipelines */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Route>

        {/* Fallback 404 handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}