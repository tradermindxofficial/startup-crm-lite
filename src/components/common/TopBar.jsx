import React from "react";
import { Search, Bell, Menu, Command } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../../context/AuthContext.jsx";

export default function TopBar({ onOpenMobileMenu }) {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hidden"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex min-w-0 items-center gap-2 md:hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Command size={16} />
          </div>
          <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">Startup CRM</span>
        </div>

        <div className="relative hidden min-w-0 flex-1 group sm:block sm:max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500"
          />
          <input
            type="text"
            placeholder="Search leads, contacts..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="ml-3 flex items-center gap-2 sm:gap-4">
        <DarkModeToggle />

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-gray-800" />
        </button>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          aria-label="User profile"
          title={user?.name || "User profile"}
        >
          {user ? getInitials(user.name) : "JD"}
        </button>
      </div>
    </header>
  );
}
