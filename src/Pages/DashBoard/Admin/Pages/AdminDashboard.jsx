import React, { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Activity,
  Bell,
  Zap,
  Layers,
  TrendingUp,
  ArrowDownRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import { Link } from "react-router-dom";

// Mock Data for Graph
const chartData = [
  { name: "01 APR", revenue: 4000 },
  { name: "02 APR", revenue: 3000 },
  { name: "03 APR", revenue: 5000 },
  { name: "04 APR", revenue: 2780 },
  { name: "05 APR", revenue: 1890 },
  { name: "06 APR", revenue: 2390 },
  { name: "07 APR", revenue: 3490 },
];

const AdminDashboard = () => {
  const axiosSecure = useAxios();
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartReady(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // --- 1. DYNAMIC DATA FETCHING ---
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard-stats");
      return res.data.data;
    },
  });

  const { data: recentOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-orders?limit=5");
      return res.data.result;
    },
  });

  if (statsLoading || ordersLoading) return <PremiumSpinner />;

  return (
    <div className="space-y-12 pb-20">
      <title>ZERO FAISHON || ADMIN DASHBOARD</title>
      {/* --- 1. ELITE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-200 pb-12">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.8] text-gray-900">
            DASHBOARD <span className="text-blue-700">OVERVIEW.</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right hidden md:block">
            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
              Network Latency
            </p>
            <p className="text-sm font-black uppercase italic text-green-600 flex items-center justify-end gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
              12ms / Stable
            </p>
          </div>

          <button className="p-5 bg-white shadow-2xl relative group border border-gray-50">
            <Bell
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="absolute top-0 right-0 w-3 h-3 bg-blue-700 border-4 border-white"></span>
          </button>
        </div>
      </div>

      {/* --- 2. DYNAMIC METRICS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Total Revenue"
          value={`BDT ${stats.totalRevenue?.toLocaleString() || "0"}`}
          icon={<DollarSign />}
          trend="+12.5%"
          isPrimary
        />
        <StatCard
          label="Active Users"
          value={stats.totalUsers || "0"}
          icon={<Users />}
          trend="+4.2%"
        />
        <StatCard
          label="Total Products Sold"
          value={stats.totalOrders || "0"}
          icon={<ShoppingBag />}
          trend="+18.1%"
        />
        <StatCard
          label="Vault Stock"
          value={stats.totalProducts || "0"}
          icon={<Package />}
          trend="-1.4%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- 3. REVENUE ANALYTICS GRAPH --- */}
        <div className="lg:col-span-8 min-w-0 bg-white p-10 shadow-sm border border-gray-100 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-700 group-hover:w-2 transition-all"></div>

          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                Revenue Trajectory
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Real-time Performance Metrics
              </p>
            </div>
            <TrendingUp size={24} className="text-gray-100" />
          </div>

          <div className="w-full h-[350px] min-w-0 min-h-[350px]">
            {chartReady && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.1} />
                      <stop
                        offset="95%"
                        stopColor="#1d4ed8"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fontWeight: "bold",
                      fill: "#9ca3af",
                    }}
                  />

                  <YAxis hide />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "none",
                      borderRadius: "0px",
                    }}
                    itemStyle={{
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1d4ed8"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* --- 4. LIVE LOGS & QUICK ACTIONS --- */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-black p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={120} />
            </div>

            <h3 className="text-[11px] font-black uppercase italic tracking-[0.3em] mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <span>System Intel</span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping inline-block"></span>
            </h3>

            <div className="space-y-8">
              <LogEntry
                time="JUST NOW"
                msg="Syncing with Firebase Cloud..."
                status="sync"
              />
              <LogEntry
                time="12M AGO"
                msg="New High-Value acquisition detected"
                status="alert"
              />
              <LogEntry
                time="1H AGO"
                msg="Automatic backup protocols active"
                status="idle"
              />
              <LogEntry
                time="4H AGO"
                msg="SSL Security handshake verified"
                status="idle"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Link to="/dashboard/orders">
              <ActionButton icon={<ShoppingBag />} label="Orders" color="blue" />
            </Link>
            <Link to="/dashboard/reports">
              <ActionButton icon={<Layers />} label="Reports" color="black" />
            </Link>
          </div>
        </div>

        {/* --- 5. RECENT TRANSACTIONS TABLE --- */}
        <div className="lg:col-span-12 bg-white p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">
              Live Acquisition Feed
            </h3>
            <Link to="/dashboard/orders" className="text-[10px] font-black uppercase border-b-2 border-black pb-1 italic tracking-widest hover:text-blue-700 hover:border-blue-700 transition-all">
              Access Archive
            </Link>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                  <th className="pb-6">Order Id </th>
                  <th className="pb-6">User Identity</th>
                  <th className="pb-6 text-center">Amount</th>
                  <th className="pb-6 text-right">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-gray-50/50 transition-all"
                  >
                    <td className="py-6 text-[10px] font-black text-gray-400 group-hover:text-black">
                      #{order._id?.toUpperCase()}
                    </td>

                    <td className="py-6">
                      <p className="text-[11px] font-black uppercase italic text-gray-900 leading-none">
                        {order.userName}
                      </p>
                      <p className="text-[8px] font-bold text-gray-400 mt-1 uppercase">
                        {order.userEmail}
                      </p>
                    </td>

                    <td className="py-6 text-center text-sm font-black italic tracking-tighter">
                      BDT {order.totalAmount}
                    </td>

                    <td className="py-6 text-right">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 border ${
                          order.orderStatus === "Pending"
                            ? "border-orange-200 text-orange-600 bg-orange-50"
                            : order.orderStatus === "Delivered"
                              ? "border-green-200 text-green-600 bg-green-50"
                              : "border-blue-200 text-blue-600 bg-blue-50"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, icon, trend, isPrimary }) => (
  <div
    className={`p-8 hover:cursor-pointer shadow-sm border transition-all duration-500 group relative overflow-hidden ${
      isPrimary
        ? "bg-black text-white border-black"
        : "bg-white text-gray-900 border-gray-100 hover:border-black"
    }`}
  >
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div
        className={`p-4 transition-all duration-500 ${
          isPrimary
            ? "bg-white/10 text-white"
            : "bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white"
        }`}
      >
        {React.cloneElement(icon, { size: 20 })}
      </div>

      <div
        className={`flex items-center gap-1 text-[10px] font-black italic ${
          trend.includes("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend.includes("+") ? (
          <TrendingUp size={12} />
        ) : (
          <ArrowDownRight size={12} />
        )}
        {trend}
      </div>
    </div>

    <div className="relative z-10">
      <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">
        {label}
      </h3>
      <p className="text-3xl font-black uppercase italic tracking-tighter">
        {value}
      </p>
    </div>

    {isPrimary && (
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-700/20 rounded-full blur-2xl"></div>
    )}
  </div>
);

const LogEntry = ({ time, msg, status }) => (
  <div className="flex gap-6 items-start">
    <span className="text-[8px] font-black text-gray-500 bg-white/5 px-2 py-1 shrink-0 mt-1">
      {time}
    </span>
    <p
      className={`text-[10px] font-black uppercase tracking-widest leading-relaxed ${
        status === "alert" ? "text-blue-500" : "text-gray-400"
      }`}
    >
      {msg}
    </p>
  </div>
);

const ActionButton = ({ icon, label, color }) => (
  <button
    className={`p-8 w-full border flex flex-col items-center justify-center gap-4 transition-all active:scale-95 group ${
      color === "blue"
        ? "border-blue-700 bg-blue-50/10 hover:bg-blue-700"
        : "border-gray-100 bg-white hover:bg-black"
    }`}
  >
    <div
      className={`transition-all duration-500 group-hover:text-white group-hover:scale-110 ${
        color === "blue" ? "text-blue-700" : "text-black"
      }`}
    >
      {React.cloneElement(icon, { size: 24 })}
    </div>

    <span className="text-[9px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">
      {label}
    </span>
  </button>
);

export default AdminDashboard;