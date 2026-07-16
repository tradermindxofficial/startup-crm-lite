import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import authService from '../services/authService.js';
import toast from 'react-hot-toast';
import { User, Mail, Calendar, Lock, Save, Edit2 } from 'lucide-react';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastLogin, setLastLogin] = useState('');

  // Set initial form state from context
  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  // Handle mock/session last login timestamp
  useEffect(() => {
    let stored = localStorage.getItem('crm-last-login');
    if (!stored) {
      const now = new Date().toLocaleString();
      localStorage.setItem('crm-last-login', now);
      stored = now;
    }
    setLastLogin(stored);
  }, []);

  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Full Name is required');
      return;
    }

    // Password validation if attempting to change password
    if (newPassword || oldPassword || confirmPassword) {
      if (!oldPassword) {
        toast.error('Current password is required to set a new password');
        return;
      }
      if (newPassword.length < 6) {
        toast.error('New password must be at least 6 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = { name: name.trim() };
      if (newPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
      }

      const response = await authService.updateProfile(payload);
      // Response structure: { success: true, data: { ...user } }
      if (response && response.success) {
        setUser(response.data);
        toast.success('Profile updated successfully!');
        
        // Reset password fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(response?.message || 'Update failed.');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile. Check current credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your account profile parameters and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: User Summary Card */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
            <div className="flex flex-col items-center text-center">
              {/* Avatar initials block */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/10">
                {user ? getInitials(user.name) : 'JD'}
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'Full Name'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@email.com'}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                <User size={12} />
                {user?.role || 'User'}
              </span>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800/80 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">Account Created</p>
                  <p className="truncate font-medium">{formatDate(user?.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">Last Login</p>
                  <p className="truncate font-medium">{lastLogin || 'Session active'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Password Update form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md transition-all duration-200">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <Edit2 size={18} className="text-blue-500" />
              Edit Profile Settings
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Profile Details Block */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    👤 Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="emailDisplay" className="block text-sm font-medium text-gray-400 mb-1.5">
                    📧 Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400/70" />
                    <input
                      id="emailDisplay"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50/50 pl-10 pr-3 py-2 text-sm text-gray-400 cursor-not-allowed dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">Email addresses are unique account identifiers and cannot be altered.</p>
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800/80 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-2">
                  <Lock size={14} />
                  🔑 Change Password
                </h4>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Current Password
                    </label>
                    <input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Required to change password"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="At least 6 characters"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Save size={16} />
                  <span>{isSubmitting ? 'Saving...' : '💾 Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
