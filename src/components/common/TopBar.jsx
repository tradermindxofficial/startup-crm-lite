import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, Command, User, Settings, LogOut, X } from "lucide-react";
import toast from "react-hot-toast";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLeads } from "../../context/LeadContext.jsx";

export default function TopBar({ onOpenMobileMenu }) {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery, setActiveFilter } = useLeads();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setLocalQuery(val);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchQuery(val);
      if (val && window.location.pathname !== "/leads") {
        navigate("/leads");
      }
    }, 300);
  };

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
    setActiveFilter("All");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const notificationsContainerRef = useRef(null);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New lead 'Aarav Mehta' added by system.", read: false, time: "5 mins ago" },
    { id: 2, text: "Meeting Scheduled with 'Rohan Patel'.", read: false, time: "1 hour ago" },
    { id: 3, text: "Database backup completed successfully.", read: false, time: "2 hours ago" },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("Notifications cleared");
  };

  // Close user dropdown on click outside
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

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsContainerRef.current &&
        !notificationsContainerRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  // Close dropdowns on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    if (isOpen || isNotificationsOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isNotificationsOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const focusable = containerRef.current?.querySelectorAll('button, [href]');
      if (focusable && focusable.length > 1) {
        focusable[1]?.focus();
      }
    } else {
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={localQuery}
            onChange={handleSearchChange}
            placeholder="Search leads across CRM..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-900 transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="ml-3 flex items-center gap-2 sm:gap-4">
        <DarkModeToggle />

        {/* Notifications Button & Dropdown */}
        <div ref={notificationsContainerRef} className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            className="relative flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
            aria-label="Notifications"
            aria-haspopup="true"
            aria-expanded={isNotificationsOpen}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white dark:border-gray-800">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 transition-all duration-150 ease-out dark:border-gray-700 dark:bg-gray-800 z-50 ${
              isNotificationsOpen
                ? "transform opacity-100 scale-100 pointer-events-auto visible"
                : "transform opacity-0 scale-95 pointer-events-none invisible"
            }`}
            role="menu"
            aria-orientation="vertical"
            tabIndex="-1"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-900 dark:text-white">Notifications</span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/50">
              {notifications.length === 0 ? (
                <div className="px-3 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`flex flex-col gap-0.5 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer ${
                      !n.read ? "bg-blue-50/20 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <p className={`text-xs ${!n.read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                      {n.text}
                    </p>
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 p-1.5 flex justify-center">
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  className="w-full text-center text-[10px] font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Button & Dropdown */}
        <div ref={containerRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleDropdown}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer"
            aria-label="User profile"
            aria-haspopup="true"
            aria-expanded={isOpen}
            title={user?.name || "User profile"}
          >
            {user ? getInitials(user.name) : "JD"}
          </button>

          {/* Profile Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 transition-all duration-150 ease-out dark:border-gray-700 dark:bg-gray-800 z-50 ${
              isOpen
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
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700/50 cursor-pointer"
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
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700/50 cursor-pointer"
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
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
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
