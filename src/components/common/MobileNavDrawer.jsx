import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Command,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", subLabel: "Overview" },
  { to: "/leads", icon: Users, label: "Leads", subLabel: "Pipeline" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", subLabel: "Insights" },
];

const SECONDARY_ITEMS = [
  { to: "/settings", icon: Settings, label: "Settings", subLabel: "Preferences" },
  { to: "/help", icon: HelpCircle, label: "Help & Support", subLabel: "Get assistance" },
];

const linkClass = ({ isActive }) =>
  `flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
  }`;

export default function MobileNavDrawer({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close navigation menu"
      />

      <aside className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-white shadow-xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Command size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Startup CRM</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Workspace</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Main</p>
          {NAV_ITEMS.map(({ to, icon: Icon, label, subLabel }) => (
            <NavLink key={to} to={to} end={to === "/"} className={linkClass} onClick={onClose}>
              <Icon size={18} className="shrink-0" />
              <div className="min-w-0">
                <p>{label}</p>
                <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{subLabel}</p>
              </div>
            </NavLink>
          ))}

          <p className="px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">More</p>
          {SECONDARY_ITEMS.map(({ to, icon: Icon, label, subLabel }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon size={18} className="shrink-0" />
              <div className="min-w-0">
                <p>{label}</p>
                <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{subLabel}</p>
              </div>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
