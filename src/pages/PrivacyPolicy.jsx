import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to Startup CRM. We are committed to protecting your personal data and your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our customer relationship management application. Please read this privacy policy carefully."
    },
    {
      title: "2. Information We Collect",
      content: "We collect information that you directly provide to us when creating an account, editing your profile, or managing lead records. This includes your name, email address, password hash, lead contact details (names, phone numbers, email addresses, company names), and workspace metadata. We also collect automated usage data, including session access timestamps and browser display configuration parameters."
    },
    {
      title: "3. How We Use Information",
      content: "We use the information we collect to operate and maintain the Startup CRM platform, process login verification queries, store and display your lead pipelines, save your display settings, send transactional notifications, and monitor analytics metrics to improve system conversion and response speeds."
    },
    {
      title: "4. Cookies and Tracking",
      content: "We use local storage keys and browser cookies to maintain your active authentication session tokens and store display preferences (such as light or dark theme choices). You can disable cookies in your browser settings, but doing so may prevent you from logging in or maintaining persistent preferences."
    },
    {
      title: "5. Data Security",
      content: "We implement industry-standard administrative, physical, and technical security measures (including JWT verification, password hashing via bcrypt, and SSL transport protocols) to guard your personal data against unauthorized access, loss, or disclosure. However, no electronic transmission over the internet or storage technology can be guaranteed 100% secure."
    },
    {
      title: "6. Third-Party Services",
      content: "Startup CRM does not sell or trade your personal data. We may share anonymized usage diagnostics with service providers hosting our databases or analytical servers under strict data processing agreements. We do not permit third-party advertising partners to track your user profile or leads database."
    },
    {
      title: "7. User Rights and Controls",
      content: "Depending on your jurisdiction, you have the right to access, rectify, or request permanent deletion of your personal data stored within Startup CRM. You can update your profile name in the Profile module. Account deletion requests can be submitted via the Settings panel and are subject to administrator approval."
    },
    {
      title: "8. Contact Information",
      content: "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our privacy compliance team via email at privacy@startupcrm.example.com."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6">
      {/* Back button and title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate('/help')}
          className="flex items-center gap-1.5 self-start text-xs font-semibold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Help Center</span>
        </button>
        <span className="text-xs text-gray-400">Last Updated: July 16, 2026</span>
      </div>

      {/* Main Glassmorphic Panel */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-gray-850">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Learn how we collect, store, and secure your database records.</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-6 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{section.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
