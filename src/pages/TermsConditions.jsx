import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

export default function TermsConditions() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By creating an account, logging in, or otherwise accessing the Startup CRM Lite application, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you are prohibited from using the application."
    },
    {
      title: "2. User Responsibilities",
      content: "You are solely responsible for all activity occurring under your account. You must maintain the confidentiality of your credentials and notify us immediately of any unauthorized usage or breaches of security. You must ensure that all lead records and contact details provided are accurate and obtained in compliance with applicable local data protection regulations."
    },
    {
      title: "3. Acceptable Use Policy",
      content: "You agree not to use Startup CRM to store or transmit any unlawful, threatening, abusive, or defamatory content. You may not upload malware, attempt unauthorized access to our server network, overload our database systems via automated API requests, or bypass any user role controls and protected routing guards."
    },
    {
      title: "4. Account Security",
      content: "We employ cryptographic hashing and session token verification protocols to secure your account. You agree to cooperate with security requests, verify your current password during profile edits, and refrain from sharing session tokens or logging into multiple devices in a manner that triggers security rate limit thresholds."
    },
    {
      title: "5. Intellectual Property Rights",
      content: "All interface designs, component layouts, brand marks, software scripts, and visual aesthetics of Startup CRM Lite are the exclusive intellectual property of the team and developers. You may not duplicate, reverse engineer, or redistribute any code packages or stylesheets without prior written authorization."
    },
    {
      title: "6. Limitation of Liability",
      content: "To the maximum extent permitted by law, Startup CRM is provided 'as is' and 'as available' without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages, including loss of database records, lead conversions, user analytics, or system downtime."
    },
    {
      title: "7. Account Termination",
      content: "We reserve the right to suspend or terminate your session and account credentials at our sole discretion, without notice, if we determine that you have violated these Terms & Conditions. You may also initiate account deletion requests directly from your Settings page."
    },
    {
      title: "8. Changes to Terms",
      content: "We reserve the right to modify these Terms & Conditions at any time. We will indicate revisions by updating the 'Last Updated' date at the top of this document. Continued use of the application following updates constitutes acceptance of the new terms."
    },
    {
      title: "9. Contact Information",
      content: "For any questions, legal concerns, or clarifications regarding these Terms & Conditions, please contact our legal counsel compliance team via email at compliance@startupcrm.example.com."
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Please review the rules and guidelines governing the use of Startup CRM.</p>
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
