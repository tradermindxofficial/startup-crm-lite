import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3 } from "lucide-react";

const MAIN_NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/leads", icon: Users, label: "Leads" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95 md:hidden"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {MAIN_NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            aria-label={label}
            className={({ isActive }) =>
              `flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`
            }
          >
            <Icon size={22} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
