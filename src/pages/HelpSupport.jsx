import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  User, 
  Settings, 
  Mail, 
  AlertTriangle, 
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function HelpSupport() {
  const navigate = useNavigate();
  // State to track open FAQ items
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // State to track modal display
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleActionClick = () => {
    setShowComingSoonModal(true);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowComingSoonModal(false);
      }
    };
    if (showComingSoonModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showComingSoonModal]);

  const handlePlaceholderLink = (name) => {
    toast(`Redirecting to ${name} placeholder document...`, {
      icon: '📄',
    });
  };

  const faqs = [
    {
      question: "How do I add a new lead to the pipeline?",
      answer: "Navigate to the Leads section in the sidebar menu and click the 'Add Lead' button. Complete the lead form details (Full Name, Company, Email, Phone, Pipeline Status, Lead Source) and save. The lead will appear instantly in your pipeline."
    },
    {
      question: "Can I export lead reports or database records?",
      answer: "Yes. From the Dashboard page, you can access the Quick Actions panel to trigger lead exports or summaries. You can also review comprehensive metrics on the Analytics page."
    },
    {
      question: "How do I toggle Dark Mode for the application?",
      answer: "Go to the Settings page (accessible via either the sidebar menu or the top-right user avatar dropdown) and toggle the 'Dark Display Theme' switch. Alternatively, click the quick theme toggle in the top navigation bar."
    },
    {
      question: "Can other team members see my leads?",
      answer: "This is controlled by your privacy settings. In Settings under 'Privacy Settings', you can toggle the 'Profile Visible to Team' option to govern workspace data sharing permissions."
    },
    {
      question: "How do I update my profile name or password?",
      answer: "Click your user avatar in the top-right corner and select 'My Profile'. Here, you can edit your Full Name or update your account password by entering your current credentials along with the new password."
    }
  ];

  const quickStarts = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
      desc: "Overview of lead stats, pipeline conversions, and recent actions."
    },
    {
      title: "Leads Pipeline",
      icon: Users,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
      desc: "Add, edit, filter, search, and manage leads in your funnel."
    },
    {
      title: "Analytics Reports",
      icon: BarChart3,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
      desc: "Visualize monthly growth, conversion rates, and sales velocity charts."
    },
    {
      title: "My Profile",
      icon: User,
      color: "text-pink-500 bg-pink-50 dark:bg-pink-950/30",
      desc: "Update your name, email ID, role info, and account credentials."
    },
    {
      title: "Settings panel",
      icon: Settings,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
      desc: "Toggle light/dark display mode, notifications, and privacy options."
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6">
      {/* 1. Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/5"></div>
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <HelpCircle size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Help & Support</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome to Startup CRM help center. Browse quick start guides, FAQs, or contact our support team.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Columns (Quick Start & FAQs) */}
        <div className="space-y-8 lg:col-span-2">
          {/* 2. Quick Start Guide */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              📖 Quick Start Guide
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Learn the basics of using Startup CRM modules to accelerate your business pipelines.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickStarts.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-xl border border-gray-100 dark:border-gray-850 p-4 bg-gray-50/30 dark:bg-gray-900/10 hover:shadow-md transition-all duration-250 hover:-translate-y-0.5 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.color}`}>
                      <item.icon size={18} />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. FAQ Section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              ❓ Frequently Asked Questions
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Find answers to commonly asked questions about workspace features.
            </p>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl border border-gray-100 bg-gray-50/20 dark:border-gray-850 dark:bg-gray-900/5 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-medium text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900/35 transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                    )}
                  </button>
                  <div 
                    className={`transition-all duration-200 ease-in-out ${
                      openFaqIndex === idx ? 'max-h-40 border-t border-gray-100 dark:border-gray-850 p-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns (Contact, Actions, Policies & App Version) */}
        <div className="space-y-6 lg:col-span-1">
          {/* 4. Contact Support Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Mail size={14} className="text-blue-500" />
              Contact Support
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Have a complex query? Our customer care specialists are available Mon-Fri, 9am-6pm EST.
            </p>
            <div className="rounded-xl bg-blue-50/50 dark:bg-blue-950/10 p-3 border border-blue-100/50 dark:border-blue-900/10">
              <p className="text-xs text-gray-400">Support Email</p>
              <a 
                href="mailto:support@startupcrm.example.com" 
                className="text-sm font-semibold text-blue-600 dark:text-blue-450 hover:underline block mt-0.5 truncate"
              >
                support@startupcrm.example.com
              </a>
            </div>
          </div>

          {/* 5 & 6. Actions Card (Report Bug / Request Feature) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              Action Items
            </h3>
            
            <button
              type="button"
              onClick={handleActionClick}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/55 dark:bg-red-950/10 text-red-650 dark:text-red-400 hover:bg-red-100/55 dark:hover:bg-red-950/20 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-150 cursor-pointer"
            >
              <AlertTriangle size={14} />
              <span>Report a Bug</span>
            </button>

            <button
              type="button"
              onClick={handleActionClick}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50/55 dark:bg-blue-950/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100/55 dark:hover:bg-blue-950/20 px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-150 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Request a Feature</span>
            </button>
          </div>

          {/* 7 & 8. Legal & Policy Placeholders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-500" />
              Legal & Terms
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium hover:underline focus:outline-none cursor-pointer"
                >
                  📄 Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium hover:underline focus:outline-none cursor-pointer"
                >
                  📄 Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* 9. Application Version Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Application Version</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-850 dark:text-gray-300">
              v1.0.0
            </span>
          </div>
        </div>
      </div>

      {/* Modern Centered "Coming Soon" Modal Dialog */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setShowComingSoonModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowComingSoonModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Sparkles size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">🚧 Coming Soon</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  We're working hard to bring this feature to Startup CRM. In a future update, you'll be able to submit bug reports and feature requests directly from the application. Thank you for your patience and support!
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowComingSoonModal(false)}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors w-full sm:w-auto cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
