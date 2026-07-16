import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, Command, User, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../../context/AuthContext.jsx";

export default function TopBar({ onOpenMobileMenu }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus first dropdown item when opened (skip avatar button which is focusable[0])
      const focusable = containerRef.current?.querySelectorAll('button, [href]');
      if (focusable && focusable.length > 1) {
        focusable[1]?.focus();
      }
    } else {
      // Return focus to avatar button when closed
      if (document.activeElement && containerRef.current?.contains(document.activeElement)) {
        buttonRef.current?.focus();
      }
    }
  }, [isOpen]);

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

        <div ref={containerRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleDropdown}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label="User profile"
            aria-haspopup="true"
            aria-expanded={isOpen}
            title={user?.name || "User profile"}
          >
            {user ? getInitials(user.name) : "JD"}
          </button>

          {/* Profile Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 transition-all duration-150 ease-out dark:border-gray-700 dark:bg-gray-800 z-50 ${isOpen
                ? "transform opacity-100 scale-100 pointer-events-auto visible"
                : "transform opacity-0 scale-95 pointer-events-none invisible"
              }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            {/* Header: User Information */}
            <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-inner">
                  {user ? getInitials(user.name) : "JD"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.name || "Full Name"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "user@email.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700/50"
                role="menuitem"
              >
                <User size={16} className="text-gray-400 dark:text-gray-500" />
                <span>My Profile</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/settings");
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700/50"
                role="menuitem"
              >
                <Settings size={16} className="text-gray-400 dark:text-gray-500" />
                <span>Settings</span>
              </button>
            </div>

            {/* Logout Action */}
            <div className="border-t border-gray-100 dark:border-gray-700 py-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-red-950/30"
                role="menuitem"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
