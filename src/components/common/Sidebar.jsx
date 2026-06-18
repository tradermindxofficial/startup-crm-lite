import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronsUpDown,
  Command,
} from "lucide-react";

const MAIN_NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", subLabel: "Overview" },
  { to: "/leads", icon: Users, label: "Leads", subLabel: "Pipeline" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", subLabel: "Insights" },
];

const SECONDARY_NAV = [
  { to: "/settings", icon: Settings, label: "Settings", subLabel: "Preferences" },
  { to: "/help", icon: HelpCircle, label: "Help & Support", subLabel: "Get assistance" },
];

export default function Sidebar() {
  const getNavLinkClass = ({ isActive }) =>
    `flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-gray-200/60 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
    }`;

  const renderLink = ({ to, icon: Icon, label, subLabel }, end = false) => (
    <NavLink key={to} to={to} end={end} className={getNavLinkClass}>
      <Icon size={18} className="shrink-0" />
      <div className="min-w-0">
        <span className="block truncate">{label}</span>
        <span className="hidden truncate text-xs font-normal text-gray-500 dark:text-gray-400 lg:block">
          {subLabel}
        </span>
      </div>
    </NavLink>
  );

  return (
    <aside className="sticky top-0 hidden h-screen w-52 shrink-0 flex-col border-r border-gray-200 bg-[#F9FAFB] dark:border-gray-800 dark:bg-gray-900 md:flex lg:w-72">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between rounded-lg px-2 transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-800"
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Command size={16} />
            </div>
            <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">Startup CRM</span>
          </div>
          <ChevronsUpDown size={16} className="hidden shrink-0 text-gray-500 lg:block" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {MAIN_NAV.map((item) => renderLink(item, item.to === "/"))}
      </nav>

      <div className="space-y-1 border-t border-gray-200 p-3 dark:border-gray-800">
        {SECONDARY_NAV.map((item) => renderLink(item))}
      </div>
    </aside>
  );
}
