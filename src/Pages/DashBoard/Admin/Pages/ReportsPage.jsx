import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { 
  TrendingUp, DollarSign, ShoppingBag, 
  Users, ArrowUpRight, ArrowDownRight, 
  Download, Filter, Calendar, Zap
} from "lucide-react";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";

const ReportsPage = () => {
  const axiosSecure = useAxios();

  // --- 1. DYNAMIC DATA FETCHING ---
  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data; 
    },
  });

  // Mock Data for Visualization
  const revenueData = [
    { name: "MON", total: 4000 },
    { name: "TUE", total: 3000 },
    { name: "WED", total: 5000 },
    { name: "THU", total: 2780 },
    { name: "FRI", total: 1890 },
    { name: "SAT", total: 2390 },
    { name: "SUN", total: 3490 },
  ];

  const categoryData = [
    { name: "T-Shirts", value: 400 },
    { name: "Hoodies", value: 300 },
    { name: "Jeans", value: 300 },
    { name: "Accessories", value: 200 },
  ];

  const COLORS = ["#000000", "#1D4ED8", "#4B5563", "#9CA3AF"];

//   if (!isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-24">
      
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-[2px] bg-blue-700"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-700 italic">Analytical Intel / 2026 Fiscal Year</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             REPORTS <br /> <span className="text-blue-700">& INSIGHTS.</span>
          </h1>
        </div>

        <div className="flex gap-4">
           <button className="bg-white border border-gray-100 p-4 hover:border-black transition-all group">
              <Download size={18} className="group-hover:translate-y-1 transition-transform" />
           </button>
           <button className="bg-black text-white px-8 py-4 flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl">
              <Calendar size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Select Timeline</span>
           </button>
        </div>
      </div>

      {/* --- METRICS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         <ReportStat label="Gross Revenue" value="BDT 452.8K" trend="+14.2%" icon={<DollarSign/>} />
         <ReportStat label="Protocol Conversions" value="1,280" trend="+5.6%" icon={<Zap/>} />
         <ReportStat label="Citizen Acquisition" value="456" trend="+12.1%" icon={<Users/>} />
         <ReportStat label="Active Stock" value="8,920" trend="-2.4%" icon={<ShoppingBag/>} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* --- REVENUE TRAJECTORY (AREA CHART) --- */}
        <div className="xl:col-span-8 bg-white p-10 border border-gray-50 shadow-sm group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-blue-700 transition-colors"></div>
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-black italic uppercase tracking-tighter">Revenue Trajectory</h3>
             <TrendingUp size={20} className="text-gray-200" />
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9ca3af'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{backgroundColor: '#000', border: 'none', borderRadius: '0px'}}
                  itemStyle={{color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="total" stroke="#1D4ED8" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- CATEGORY DISTRIBUTION (PIE CHART) --- */}
        <div className="xl:col-span-4 bg-white p-10 border border-gray-50 shadow-sm relative group">
           <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-blue-700 transition-colors"></div>
           <h3 className="text-xl font-black italic uppercase tracking-tighter mb-10">Asset Scope</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie data={categoryData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                   </Pie>
                   <Tooltip />
                </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="mt-6 space-y-3">
              {categoryData.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2" style={{backgroundColor: COLORS[i]}}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.name}</span>
                   </div>
                   <span className="text-[10px] font-black italic">{item.value} units</span>
                </div>
              ))}
           </div>
        </div>

        {/* --- TOP PERFORMING PRODUCTS (TABLE) --- */}
        <div className="xl:col-span-12 bg-gray-900 p-12 text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <TrendingUp size={300} />
           </div>
           <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 border-b border-white/10 pb-6">High-Performance Assets</h3>
           <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 border-b border-white/5">
                       <th className="pb-6">Nomenclature</th>
                       <th className="pb-6">Total Sales</th>
                       <th className="pb-6">Status</th>
                       <th className="pb-6 text-right">Revenue Generated</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {[1,2,3].map((_, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-all">
                         <td className="py-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10"></div>
                            <span className="text-[11px] font-black uppercase italic tracking-widest">Heavy Weight Tee Vol.{i + 1}</span>
                         </td>
                         <td className="py-6 text-[11px] font-bold tracking-widest">482 Units</td>
                         <td className="py-6">
                            <span className="text-[9px] font-black uppercase bg-blue-700 px-2 py-1 italic tracking-widest">Top Tier</span>
                         </td>
                         <td className="py-6 text-right text-sm font-black italic tracking-tighter">BDT 96,400</td>
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

// Reusable Stat Component
const ReportStat = ({ label, value, trend, icon }) => (
  <div className="bg-white p-8 border border-gray-50 shadow-sm group hover:border-black transition-all duration-500">
     <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all">
           {React.cloneElement(icon, { size: 20 })}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black italic ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
           {trend.includes('+') ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
           {trend}
        </div>
     </div>
     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{label}</h3>
     <p className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">{value}</p>
  </div>
);

export default ReportsPage;