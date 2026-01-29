// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   DollarSign,
//   ShoppingCart,
//   Package,
//   TrendingUp,
//   AlertCircle,
//   ArrowRight,
//   Activity,
//   Clock,
//   Download,
//   RefreshCw,
// } from "lucide-react";
// import StatsCard from "@/components/StatsCard";
// import { StatsSkeleton, Skeleton } from "@/components/ui/Skeleton";
// import { DashboardService } from "@/lib/api";
// import { toast } from "sonner";
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
// } from "recharts";
// import { formatCurrency, getOrderStatusColor, downloadCSV } from "@/lib/utils";
// import Link from "next/link";

// // --- Types ---
// interface DashboardStats {
//   totalOrders: number;
//   totalRevenue: number;
//   totalCustomers: number;
//   pendingOrders: number;
//   lowStockCount: number;
//   todayOrders: number;
//   todayRevenue: number;
//   ordersByStatus: Array<{ _id: string; count: number }>;
// }

// // Chart Colors
// const COLORS = [
//   "#3b82f6",
//   "#10b981",
//   "#f59e0b",
//   "#ec4899",
//   "#8b5cf6",
//   "#06b6d4",
// ];
// const STATUS_COLORS: Record<string, string> = {
//   Placed: "#3b82f6",
//   Confirmed: "#8b5cf6",
//   Packed: "#f59e0b",
//   Shipped: "#f97316",
//   Delivered: "#10b981",
//   Cancelled: "#ef4444",
// };

// export default function DashboardPage() {
//   // --- State ---
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
//   const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);
//   const [recentOrders, setRecentOrders] = useState<any[]>([]);
//   const [topProducts, setTopProducts] = useState<any[]>([]);
//   const [categorySales, setCategorySales] = useState<any[]>([]);
//   const [customerGrowth, setCustomerGrowth] = useState<any[]>([]);

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setIsLoading(true);

//       const [
//         statsRes,
//         monthlyRevRes,
//         dailyRevRes,
//         ordersRes,
//         productsRes,
//         categoryRes,
//         growthRes,
//       ] = await Promise.all([
//         DashboardService.getStats(),
//         DashboardService.getMonthlyRevenue(),
//         DashboardService.getDailyRevenue(),
//         DashboardService.getRecentOrders(5),
//         DashboardService.getTopSellingProducts(5),
//         DashboardService.getSalesByCategory(),
//         DashboardService.getCustomerGrowth(),
//       ]);

//       // --- Data Extraction (With Safe Checks) ---

//       // 1. Stats
//       const statsData =
//         statsRes.data?.data?.stats || statsRes.data?.stats || {};
//       setStats(statsData);
//       console.log("Orders By Status:", statsData);

//       // 2. Monthly Revenue
//       const mRevData =
//         monthlyRevRes.data?.data?.data || monthlyRevRes.data?.data || [];
//       setMonthlyRevenue(Array.isArray(mRevData) ? mRevData : []);

//       // 3. Daily Revenue
//       const dRevData =
//         dailyRevRes.data?.data?.data || dailyRevRes.data?.data || [];
//       setDailyRevenue(Array.isArray(dRevData) ? dRevData : []);

//       // 4. Recent Orders
//       const rOrders =
//         ordersRes.data?.data?.orders || ordersRes.data?.orders || [];
//       setRecentOrders(Array.isArray(rOrders) ? rOrders : []);

//       // 5. Top Products
//       const tProds =
//         productsRes.data?.data?.products || productsRes.data?.products || [];
//       setTopProducts(Array.isArray(tProds) ? tProds : []);

//       // 6. Category Sales
//       const cSales =
//         categoryRes.data?.data?.data || categoryRes.data?.data || [];
//       setCategorySales(Array.isArray(cSales) ? cSales : []);

//       // 7. Customer Growth
//       const growthData =
//         growthRes.data?.data?.data || growthRes.data?.data || [];
//       if (Array.isArray(growthData)) {
//         const formattedGrowth = growthData.map((item: any) => {
//           const year = item._id?.year || new Date().getFullYear();
//           const month = (item._id?.month || 1) - 1;
//           const date = new Date(year, month);
//           return {
//             name: date.toLocaleString("default", {
//               month: "short",
//               year: "2-digit",
//             }),
//             count: item.newCustomers || 0,
//           };
//         });
//         setCustomerGrowth(formattedGrowth);
//       }
//     } catch (error: any) {
//       console.error("Dashboard data fetch error:", error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleExport = () => {
//     if (monthlyRevenue.length === 0) {
//       toast.error("No revenue data available to export");
//       return;
//     }

//     const reportData = monthlyRevenue.map((item) => ({
//       Month: item.monthName,
//       Total_Orders: item.orders || 0,
//       Total_Revenue: `₹${(item.revenue || 0).toLocaleString("en-IN")}`,
//       Generated_Date: new Date().toLocaleDateString("en-IN"),
//     }));

//     const fileName = `Revenue_Report_${new Date().toISOString().split("T")[0]}`;
//     downloadCSV(reportData, fileName);

//     toast.success("Report downloaded successfully!");
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between">
//           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         </div>
//         <StatsSkeleton />
//         <div className="grid gap-6 lg:grid-cols-2">
//           <Skeleton className="h-80" />
//           <Skeleton className="h-80" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 pb-10">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
//       >
//         <div>
//           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//           <p className="mt-1 text-gray-400">
//             Overview of your store performance
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleExport}
//             className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-green-900/20"
//           >
//             <Download className="h-4 w-4" />
//             Export Report
//           </button>

//           <button
//             onClick={fetchDashboardData}
//             disabled={isLoading}
//             className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors border border-white/10"
//           >
//             <RefreshCw
//               className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
//             />
//             Refresh
//           </button>
//         </div>
//       </motion.div>

//       {/* 1. Key Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <StatsCard
//           title="Total Revenue"
//           value={stats?.totalRevenue || 0}
//           prefix="₹"
//           icon={DollarSign}
//           iconColor="text-green-400"
//           iconBg="bg-green-500/10"
//           description={`+${formatCurrency(stats?.todayRevenue || 0)} today`}
//           delay={0}
//         />
//         <StatsCard
//           title="Total Orders"
//           value={stats?.totalOrders || 0}
//           icon={ShoppingCart}
//           iconColor="text-blue-400"
//           iconBg="bg-blue-500/10"
//           description={`+${stats?.todayOrders || 0} new today`}
//           delay={0.1}
//         />
//         <StatsCard
//           title="Pending Orders"
//           value={stats?.pendingOrders || 0}
//           icon={Clock}
//           iconColor="text-orange-400"
//           iconBg="bg-orange-500/10"
//           description="Requires attention"
//           delay={0.2}
//         />
//         <StatsCard
//           title="Low Stock"
//           value={stats?.lowStockCount || 0}
//           icon={AlertCircle}
//           iconColor="text-red-400"
//           iconBg="bg-red-500/10"
//           description="Products need restock"
//           delay={0.3}
//         />
//       </div>

//       {/* 2. Charts Row */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Monthly Revenue */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-white">
//                 Monthly Revenue
//               </h3>
//               <p className="text-sm text-gray-400">Performance over the year</p>
//             </div>
//             <div className="p-2 bg-green-500/10 rounded-lg">
//               <TrendingUp className="h-5 w-5 text-green-400" />
//             </div>
//           </div>
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={monthlyRevenue}>
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(255,255,255,0.1)"
//                 />
//                 <XAxis
//                   dataKey="monthName"
//                   stroke="#9ca3af"
//                   style={{ fontSize: "12px" }}
//                 />
//                 <YAxis
//                   stroke="#9ca3af"
//                   style={{ fontSize: "12px" }}
//                   tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#171717",
//                     border: "1px solid #333",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                   formatter={(val: any) => [formatCurrency(val), "Revenue"]}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#10b981"
//                   fill="url(#colorRevenue)"
//                   strokeWidth={2}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

//         {/* Daily Sales Trend */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-white">
//                 Daily Sales Trend
//               </h3>
//               <p className="text-sm text-gray-400">Last 30 days performance</p>
//             </div>
//             <div className="p-2 bg-blue-500/10 rounded-lg">
//               <Activity className="h-5 w-5 text-blue-400" />
//             </div>
//           </div>
//           <div className="h-[300px] w-full">
//             {dailyRevenue.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={dailyRevenue}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(255,255,255,0.1)"
//                   />
//                   <XAxis
//                     dataKey="_id"
//                     stroke="#9ca3af"
//                     style={{ fontSize: "12px" }}
//                     tickFormatter={(val) => (val ? val.substring(5) : "")}
//                   />
//                   <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#171717",
//                       border: "1px solid #333",
//                       borderRadius: "8px",
//                     }}
//                     formatter={(val: any) => [formatCurrency(val), "Revenue"]}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#3b82f6"
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-gray-500">
//                 No sales in the last 30 days
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* 3. Breakdown Charts */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Order Status */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <h3 className="text-lg font-semibold text-white mb-4">
//             Order Status
//           </h3>
//           <div className="h-[250px] w-full">
//             {stats?.ordersByStatus && stats.ordersByStatus.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={stats.ordersByStatus}
//                     dataKey="count"
//                     nameKey="_id"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={5}
//                   >
//                     {stats.ordersByStatus.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={STATUS_COLORS[entry._id] || "#9ca3af"}
//                         stroke="rgba(0,0,0,0)"
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#171717",
//                       border: "1px solid #333",
//                     }}
//                   />
//                   <Legend
//                     layout="horizontal"
//                     verticalAlign="bottom"
//                     align="center"
//                     wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-gray-500">
//                 No orders yet
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Sales By Category */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <h3 className="text-lg font-semibold text-white mb-4">
//             Sales by Category
//           </h3>
//           <div className="h-[250px] w-full">
//             {categorySales.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categorySales}
//                     dataKey="totalRevenue"
//                     nameKey="_id"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                   >
//                     {categorySales.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                         stroke="rgba(0,0,0,0)"
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#171717",
//                       border: "1px solid #333",
//                     }}
//                     formatter={(val: any) => formatCurrency(val)}
//                   />
//                   <Legend
//                     layout="horizontal"
//                     verticalAlign="bottom"
//                     align="center"
//                     wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-gray-500">
//                 No sales yet
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Customer Growth */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <h3 className="text-lg font-semibold text-white mb-4">
//             New Customers
//           </h3>
//           <div className="h-[250px] w-full">
//             {customerGrowth.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={customerGrowth}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(255,255,255,0.1)"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     stroke="#9ca3af"
//                     style={{ fontSize: "10px" }}
//                   />
//                   <Tooltip
//                     cursor={{ fill: "rgba(255,255,255,0.05)" }}
//                     contentStyle={{
//                       backgroundColor: "#171717",
//                       border: "1px solid #333",
//                     }}
//                   />
//                   <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex h-full items-center justify-center text-gray-500">
//                 No customers yet
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* 4. Recent Orders & Top Products */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Recent Orders */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <div className="mb-4 flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
//             <Link
//               href="/dashboard/orders"
//               className="text-sm text-blue-400 hover:underline flex items-center gap-1"
//             >
//               View All <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//           <div className="space-y-3">
//             {recentOrders.length > 0 ? (
//               recentOrders.map((order) => (
//                 <div
//                   key={order._id}
//                   className="flex justify-between items-center p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="hidden sm:block p-2 rounded-full bg-white/5">
//                       <Package className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-white">
//                         {order.orderNumber}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {order.user?.name || "Guest User"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-semibold text-white">
//                       {formatCurrency(order.totalAmount)}
//                     </p>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${getOrderStatusColor(order.orderStatus)}`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No recent orders</p>
//             )}
//           </div>
//         </motion.div>

//         {/* Top Selling Products */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
//         >
//           <h3 className="mb-4 text-lg font-semibold text-white">Top Selling</h3>
//           <div className="space-y-4">
//             {topProducts.length > 0 ? (
//               topProducts.map((product, index) => (
//                 <div key={product._id} className="flex items-center gap-4">
//                   <div
//                     className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
//                     ${
//                       index === 0
//                         ? "bg-yellow-500/20 text-yellow-400"
//                         : index === 1
//                           ? "bg-gray-400/20 text-gray-300"
//                           : index === 2
//                             ? "bg-orange-500/20 text-orange-400"
//                             : "bg-white/10 text-gray-400"
//                     }`}
//                   >
//                     #{index + 1}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-white truncate">
//                       {product.name}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {product.totalSales} units sold
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center">No sales data yet.</p>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Download,
  RefreshCw,
  Calendar,
  Plus,
  Package,
  Target,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { StatsSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { DashboardService } from "@/lib/api";
import { toast } from "sonner";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { formatCurrency, getOrderStatusColor, downloadCSV } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";

// 🔥 IMPORT NEW COMPONENTS
const SalesHeatmap = dynamic(
  () => import("@/components/dashboard/SalesHeatmap"),
  {
    ssr: false,
  },
);

const InventoryForecast = dynamic(
  () => import("@/components/dashboard/InventoryForecast"),
  {
    ssr: false,
  },
);

// --- Styled Components / Utilities ---
const glassCard =
  "rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md shadow-xl p-6 hover:bg-white/[0.05] transition-all duration-300";
const actionBtn =
  "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer group h-full";

export default function DashboardPage() {
  // --- State ---
  const [stats, setStats] = useState<any>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30days");
  const [hasMounted, setHasMounted] = useState(false);

  // Mock Target (Backend integration later)
  const MONTHLY_TARGET = 50000;

  useEffect(() => {
    setHasMounted(true);
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, monthlyRevRes, ordersRes, productsRes] =
        await Promise.all([
          DashboardService.getStats(),
          DashboardService.getMonthlyRevenue(),
          DashboardService.getRecentOrders(5),
          DashboardService.getTopSellingProducts(4),
        ]);

      setStats(statsRes.data?.data?.stats || statsRes.data?.stats || {});
      setMonthlyRevenue(
        Array.isArray(monthlyRevRes.data?.data?.data)
          ? monthlyRevRes.data?.data?.data
          : [],
      );
      setRecentOrders(
        Array.isArray(ordersRes.data?.data?.orders)
          ? ordersRes.data?.data?.orders
          : [],
      );
      setTopProducts(
        Array.isArray(productsRes.data?.data?.products)
          ? productsRes.data?.data?.products
          : [],
      );
    } catch (error: any) {
      console.error("Dashboard data fetch error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculations
  const avgOrderValue = useMemo(() => {
    if (!stats?.totalRevenue || !stats?.totalOrders) return 0;
    return Math.round(stats.totalRevenue / stats.totalOrders);
  }, [stats]);

  const targetProgress = useMemo(() => {
    if (!stats?.totalRevenue) return 0;
    const progress = (stats.totalRevenue / MONTHLY_TARGET) * 100;
    return Math.min(progress, 100);
  }, [stats]);

  // Handle Export
  const handleExport = () => {
    if (monthlyRevenue.length === 0) {
      toast.error("No data to export");
      return;
    }
    const reportData = monthlyRevenue.map((item) => ({
      Month: item.monthName,
      Orders: item.orders || 0,
      Revenue: `₹${(item.revenue || 0).toLocaleString("en-IN")}`,
    }));
    downloadCSV(
      reportData,
      `Dashboard_Report_${new Date().toISOString().split("T")[0]}`,
    );
    toast.success("Report downloaded!");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsSkeleton />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!hasMounted) {
    return <StatsSkeleton />;
  }

  return (
    <div className="space-y-6 pb-10">
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-400 text-sm">
            Overview of your store's performance today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="7days" className="bg-gray-900">
                Last 7 Days
              </option>
              <option value="30days" className="bg-gray-900">
                Last 30 Days
              </option>
              <option value="month" className="bg-gray-900">
                This Month
              </option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-900/20 backdrop-blur-sm"
          >
            <Download className="h-4 w-4" /> Report
          </button>

          <button
            onClick={fetchDashboardData}
            className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </motion.div>

      {/* --- 1. KPI SECTION --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={stats?.totalRevenue || 0}
          prefix="₹"
          icon={DollarSign}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          description={`+${formatCurrency(stats?.todayRevenue || 0)} today`}
          delay={0}
        />
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          description={`+${stats?.todayOrders || 0} today`}
          delay={0.1}
        />
        <StatsCard
          title="Avg Order Value"
          value={avgOrderValue}
          prefix="₹"
          icon={TrendingUp}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
          description="Per transaction"
          delay={0.2}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${glassCard} border-l-4 ${
            stats?.pendingOrders > 0
              ? "border-l-amber-500"
              : "border-l-gray-600"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Pending Actions
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats?.pendingOrders || 0}
              </h3>
              <p className="text-xs text-amber-400 mt-1">Orders need packing</p>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- 2. MAIN CONTENT: Revenue & Forecast --- */}
      <div className="grid gap-6 lg:grid-cols-3 min-h-[400px]">
        {/* Left: Revenue Chart (2 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${glassCard} lg:col-span-2 flex flex-col`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Revenue Trends
              </h3>
              <p className="text-sm text-gray-400">Performance over time</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12.5% vs last period
            </div>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="monthName"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f0f11",
                    borderColor: "#333",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(val: any) => [formatCurrency(val), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right: Targets & AI Forecast (1 Col) */}
        <div className="flex flex-col gap-6">
          {/* Sales Target Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={glassCard}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" /> Monthly Target
              </h3>
              <span className="text-xs text-gray-400">
                Goal: {formatCurrency(MONTHLY_TARGET)}
              </span>
            </div>

            <div className="relative h-32 flex items-center justify-center">
              <PieChart width={120} height={120}>
                <Pie
                  data={[
                    { value: targetProgress },
                    { value: 100 - targetProgress },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="rgba(255,255,255,0.1)" />
                </Pie>
              </PieChart>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white">
                  {Math.round(targetProgress)}%
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">
              {formatCurrency(MONTHLY_TARGET - (stats?.totalRevenue || 0))} more
              to reach goal
            </p>
          </motion.div>

          {/* 🔥 NEW: Inventory Forecast Widget (Replaced Trending) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <InventoryForecast />
          </motion.div>
        </div>
      </div>

      {/* --- 3. HEATMAP & ACTIONS --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Heatmap (2 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white">
              Live Sales Activity
            </h3>
            <p className="text-sm text-gray-400">
              Real-time order locations & density
            </p>
          </div>
          <SalesHeatmap />
        </motion.div>

        {/* Right: Quick Actions (1 Col) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 h-full content-start pt-14"
        >
          <Link href="/dashboard/products/add" className={actionBtn}>
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-white">Add Product</span>
          </Link>
          <Link href="/dashboard/orders" className={actionBtn}>
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Package className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-white">Orders</span>
          </Link>
          <div className={actionBtn}>
            <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <AlertCircle className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-white">Alerts</span>
          </div>
          <div className={actionBtn}>
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-white">Finances</span>
          </div>
        </motion.div>
      </div>

      {/* --- 4. RECENT ORDERS TABLE --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${glassCard}`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">
            Recent Transactions
          </h3>
          <Link
            href="/dashboard/orders"
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-white/5 transition group cursor-pointer"
                  >
                    <td className="px-4 py-4 text-white font-medium group-hover:text-blue-400 transition-colors">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-4">{order.user?.name || "Guest"}</td>
                    <td className="px-4 py-4 font-mono text-gray-200">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getOrderStatusColor(order.orderStatus)} border-opacity-20`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-right">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
