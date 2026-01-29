// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import PageTransition from "@/components/PageTransition";
// import { SocketProvider } from "@/components/providers/SocketProvider";
// import { motion, AnimatePresence } from "framer-motion";
// import { AdminAuthService } from "@/lib/api";
// import { Menu, X } from "lucide-react"; // Icons for mobile toggle

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State

//   // --- SECURITY CHECK ---
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await AdminAuthService.getProfile();
//         setIsAuthorized(true);
//       } catch (error) {
//         console.error("Auth check failed:", error);
//         router.push("/login");
//       }
//     };

//     checkAuth();
//   }, [router]);

//   if (!isAuthorized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
//           <p className="text-gray-400">Verifying session...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <SocketProvider>
//       <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
//         {/* Animated Background Elements */}
//         <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//           <motion.div
//             animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-blue-500/5 blur-3xl"
//           />
//           <motion.div
//             animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
//             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//             className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-cyan-500/5 blur-3xl"
//           />
//         </div>

//         {/* --- MOBILE MENU TOGGLE BUTTON (Visible only on Mobile) --- */}
//         <div className="lg:hidden fixed top-4 left-4 z-50">
//           <button
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//             className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg active:scale-95 transition-all"
//           >
//             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* --- MOBILE OVERLAY (Backdrop) --- */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setSidebarOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />
//           )}
//         </AnimatePresence>

//         {/* --- SIDEBAR WRAPPER --- */}
//         {/* lg:translate-x-0 ensures it's always visible on desktop */}
//         <div
//           className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           <Sidebar />
//         </div>

//         {/* --- MAIN CONTENT AREA --- */}
//         {/* lg:ml-64 ensures space for sidebar on desktop, ml-0 for mobile */}
//         <div className="relative z-20 flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-64">
//           {/* Header Container */}
//           <div className="sticky top-0 z-30">
//             <Header />
//           </div>

//           <main className="flex-1 pt-6 lg:pt-8">
//             <div className="p-4 md:p-6 lg:p-8">
//               <PageTransition>{children}</PageTransition>
//             </div>
//           </main>
//         </div>
//       </div>
//     </SocketProvider>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { motion, AnimatePresence } from "framer-motion";
import { AdminAuthService } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // ఇది మన స్విచ్ (State)

  // --- SECURITY CHECK ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AdminAuthService.getProfile();
        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <SocketProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-blue-500/5 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-cyan-500/5 blur-3xl"
          />
        </div>

        {/* --- ఇక్కడ పాత బటన్ కోడ్ ఉండేది, దాన్ని తీసేసాము --- */}

        {/* --- MOBILE OVERLAY (Backdrop) --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* --- SIDEBAR WRAPPER --- */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="relative z-20 flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-64">
          {/* Header Container */}
          <div className="sticky top-0 z-30">
            {/* --- UPDATE: ఇక్కడ మనం props పాస్ చేస్తున్నాం --- */}
            <Header
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>

          <main className="flex-1 pt-6 lg:pt-8">
            <div className="p-4 md:p-6 lg:p-8">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
