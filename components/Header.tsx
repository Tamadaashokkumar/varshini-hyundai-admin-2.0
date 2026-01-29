"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, LogOut, AlertTriangle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminAuthService } from "@/lib/api";

// --- PROPS INTERFACE ---
// Sidebar ని కంట్రోల్ చేయడానికి props స్వీకరిస్తున్నాం
interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ isSidebarOpen, setSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ... (Fetch Notifications Logic - Same as before)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setNotificationCount(5); // Mock Data
      } catch (error) {
        console.error("Failed to fetch notifications");
      }
    };
    fetchNotifications();
  }, []);

  // ... (Search Handler - Same as before)
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(
        `/dashboard/products?search=${encodeURIComponent(searchQuery)}`,
      );
    }
  };

  // ... (Logout Logic - Same as before)
  const handleLogout = async () => {
    try {
      await AdminAuthService.logout();
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Failed to logout");
    } finally {
      setIsLogoutOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        // --- UPDATED HEADER CLASSES ---
        // flex-wrap: Allows items to wrap on smaller screens
        // h-auto py-3: Dynamic height and padding for mobile
        // lg:h-16 lg:py-0: Fixed height and no padding for desktop
        className="sticky right-0 top-0 z-30 flex h-auto w-full flex-wrap items-center justify-between border-b border-white/5 bg-black/40 px-4 py-3 backdrop-blur-xl transition-all duration-300 ease-in-out lg:h-16 lg:px-6 lg:py-0"
      >
        {/* --- MOBILE HAMBURGER BUTTON --- */}
        {/* lg:hidden: Only visible on mobile */}
        <div className="lg:hidden mr-4 order-1">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg active:scale-95 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* --- RIGHT ACTIONS (Bell, Logout) --- */}
        {/* ml-auto: Pushes to the right */}
        {/* order-2: Appears after hamburger on mobile */}
        {/* lg:order-3: Appears last on desktop */}
        <div className="flex items-center gap-2 ml-auto lg:ml-4 order-2 lg:order-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-xl bg-white/5 p-2.5 text-gray-400 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => toast.info("Notifications feature coming soon!")}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogoutOpen(true)}
            className="rounded-xl bg-white/5 p-2.5 text-gray-400 backdrop-blur-sm transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
          </motion.button>
        </div>

        {/* --- SEARCH BAR --- */}
        {/* w-full mt-4: Full width and margin-top on mobile */}
        {/* order-3: Appears last (below everything) on mobile */}
        {/* lg:w-auto lg:mt-0 lg:order-2: Normal size and position on desktop */}
        <div className="w-full mt-4 lg:mt-0 lg:flex-1 lg:w-auto order-3 lg:order-2 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-500/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </motion.header>

      {/* --- LOGOUT MODAL (No changes here) --- */}
      <AnimatePresence>
        {isLogoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-red-500/10 p-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Log Out?</h3>
                <p className="mb-6 text-sm text-gray-400">
                  Are you sure you want to sign out?
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setIsLogoutOpen(false)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
