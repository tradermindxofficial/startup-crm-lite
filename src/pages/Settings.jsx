import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  Globe2, 
  HelpCircle, 
  LogOut, 
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Local state for notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  
  // Local state for privacy
  const [publicProfile, setPublicProfile] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  
  // Local state for language
  const [language, setLanguage] = useState('en-US');
  
  // Modal toggle state for account deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    toast.error('Account deletion is disabled in the evaluation environment.');
    setShowDeleteModal(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Customize your workspace configuration, notification routes, and display preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            {isDarkMode ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-500" />}
            🌗 Appearance Settings
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Toggle between light and dark display modes for comfortable viewing.
          </p>
          <div className="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-800/80">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Dark Display Theme</p>
              <p className="text-xs text-gray-400">Reduce screen glare during late hours.</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
              role="switch"
              aria-checked={isDarkMode}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isDarkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Bell size={18} className="text-blue-500" />
            🔔 Notification Preferences
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Manage when and how you receive alerts regarding lead status shifts and system messages.
          </p>

          <div className="space-y-4 border-t border-gray-50 pt-4 dark:border-gray-800/80">
            {/* Email Alerts Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Alerts</p>
                <p className="text-xs text-gray-400">Receive transactional alerts directly in your inbox.</p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={emailAlerts}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-800/80">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">In-App Push Alerts</p>
                <p className="text-xs text-gray-400">Show notification popups when leads update in real-time.</p>
              </div>
              <button
                type="button"
                onClick={() => setPushAlerts(!pushAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  pushAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={pushAlerts}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Weekly Summary Reports Toggle */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-800/80">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Weekly Pipeline Summary</p>
                <p className="text-xs text-gray-400">Get a weekly email digest of lead conversions and stats.</p>
              </div>
              <button
                type="button"
                onClick={() => setWeeklyReports(!weeklyReports)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  weeklyReports ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={weeklyReports}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    weeklyReports ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Privacy */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Lock size={18} className="text-emerald-500" />
            🔒 Privacy Settings
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Configure security, visibility, and data tracking attributes for your user profile.
          </p>

          <div className="space-y-4 border-t border-gray-50 pt-4 dark:border-gray-800/80">
            {/* Public Profile Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Profile Visible to Team</p>
                <p className="text-xs text-gray-400">Allow other CRM workspace users to see your status and leads owned.</p>
              </div>
              <button
                type="button"
                onClick={() => setPublicProfile(!publicProfile)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  publicProfile ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={publicProfile}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    publicProfile ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Share Analytics Toggle */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4 dark:border-gray-800/80">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Share Usage Analytics</p>
                <p className="text-xs text-gray-400">Permit sharing anonymized diagnostics to help improve Startup CRM Lite.</p>
              </div>
              <button
                type="button"
                onClick={() => setShareAnalytics(!shareAnalytics)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  shareAnalytics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={shareAnalytics}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    shareAnalytics ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: General Preferences */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Globe2 size={18} className="text-indigo-500" />
            🌐 Language (placeholder)
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Configure localization settings for date structures, currency symbols, and text translations.
          </p>

          <div className="flex flex-col gap-4 border-t border-gray-50 pt-4 dark:border-gray-800/80 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Preferred Workspace Language</p>
              <p className="text-xs text-gray-400">Select language for interface labels.</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="en-US">English (United States)</option>
              <option value="es-ES">Español (España)</option>
              <option value="fr-FR">Français (France)</option>
              <option value="de-DE">Deutsch (Deutschland)</option>
            </select>
          </div>
        </div>

        {/* Section 5: Account Actions & App Details */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200 space-y-6">
          <div className="flex flex-col gap-4 justify-between border-b border-gray-50 pb-6 dark:border-gray-800/80 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle size={18} className="text-gray-400" />
                📱 App Version
              </h3>
              <p className="text-xs text-gray-400 mt-1">Application build details.</p>
            </div>
            <span className="self-start rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:self-center">
              Startup CRM Lite v1.2.0-beta
            </span>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Workspace Actions</h4>
              <p className="text-xs text-gray-400">Logout of session or submit deletion request.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* Sign Out Button */}
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors focus:ring-1 focus:ring-gray-400 dark:border-gray-750 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer"
              >
                <LogOut size={16} />
                <span>🚪 Sign Out</span>
              </button>

              {/* Delete Account Button */}
              <button
                type="button"
                onClick={handleDeleteAccountClick}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 px-4 py-2 text-sm font-medium border border-red-200/60 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors focus:ring-1 focus:ring-red-400 cursor-pointer"
              >
                <Trash2 size={16} />
                <span>🗑️ Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal for Delete Account */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                <AlertTriangle size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Delete Workspace Account?</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to request permanent deletion? All lead pipelines, notes, and contacts owned by this account will be permanently cleared.
                </p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-100 dark:border-amber-900/30 mt-4">
                  <p className="text-xs text-amber-800 dark:text-amber-500 leading-relaxed font-medium">
                    ⚠️ Note: Deletion requests must be approved by a system administrator in accordance with data rentention terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-gray-300 hover:bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
