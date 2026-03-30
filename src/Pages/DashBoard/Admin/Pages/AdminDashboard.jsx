import React from 'react';
import { 
  Users, ShoppingBag, DollarSign, 
  Package, ArrowUpRight, Activity, 
  Bell, ShieldCheck, Zap, Layers 
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans p-6 lg:p-10">
      
      {/* --- 1. HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic">
            XIV System / 2026 Admin Panel
          </p>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] text-gray-900">
             CONTROL <br /> VAULT.
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block border-r border-gray-300 pr-6">
            <p className="text-[9px] font-black uppercase text-gray-400">Server Health</p>
            <p className="text-sm font-black uppercase italic text-green-600">Optimal / 99.9%</p>
          </div>
          <button className="p-4 bg-white shadow-xl relative group">
             <Bell size={20} className="group-hover:rotate-12 transition-transform" />
             <span className="absolute top-0 right-0 w-2 h-2 bg-blue-700"></span>
          </button>
        </div>
      </div>

      {/* --- 2. KEY PERFORMANCE METRICS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatCard label="Total Capital" value="BDT 154.2K" icon={<DollarSign />} trend="+12%" />
        <StatCard label="Member Count" value="1,240" icon={<Users />} trend="+4%" />
        <StatCard label="Acquisitions" value="856" icon={<ShoppingBag />} trend="+18%" />
        <StatCard label="Active Stock" value="4,320" icon={<Package />} trend="-2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- 3. RECENT ACQUISITIONS TABLE --- */}
        <div className="lg:col-span-8 bg-white p-10 shadow-2xl relative overflow-hidden border-t-8 border-black">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Live Acquisitions</h3>
            <button className="text-[10px] font-black uppercase underline tracking-[0.2em] text-gray-400 hover:text-black">View All Data</button>
          </div>
          
          <div className="space-y-6">
             {[
               { id: '8219', user: 'Yasir Arafat', price: '249', status: 'Pending' },
               { id: '9012', user: 'Member #091', price: '199', status: 'Dispatched' },
               { id: '7762', user: 'Guest #442', price: '450', status: 'Delivered' },
               { id: '1120', user: 'Member #112', price: '320', status: 'Pending' },
             ].map((order, i) => (
               <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 group/row cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-gray-300">#{order.id}</span>
                    <h4 className="text-sm font-black uppercase italic tracking-tighter text-gray-900 group-hover/row:translate-x-2 transition-transform">
                      {order.user}
                    </h4>
                  </div>
                  <div className="flex items-center gap-10">
                    <span className="text-sm font-black italic tracking-tighter text-gray-900">${order.price}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 ${order.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                      {order.status}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* --- 4. SYSTEM LOGS & ACTIONS --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Internal Logs Card */}
          <div className="bg-black p-10 text-white shadow-2xl">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              System Logs <Activity size={18} className="text-blue-500 animate-pulse" />
            </h3>
            <div className="space-y-6">
              <LogEntry time="2M" msg="Inventory sync completed" />
              <LogEntry time="15M" msg="New member verification success" />
              <LogEntry time="1H" msg="Server backup generated" />
              <LogEntry time="4H" msg="Payment gateway update" />
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 gap-4">
             <button className="bg-white p-6 shadow-sm border border-transparent hover:border-black transition-all flex flex-col items-center justify-center gap-3 group">
                <Zap size={20} className="text-blue-700 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">Add New Item</span>
             </button>
             <button className="bg-white p-6 shadow-sm border border-transparent hover:border-black transition-all flex flex-col items-center justify-center gap-3 group">
                <Layers size={20} className="text-gray-900 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">Update Stock</span>
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, icon, trend }) => (
  <div className="bg-white p-8 shadow-sm border border-transparent hover:border-black transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className={`text-[10px] font-black italic ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</h3>
    <p className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">{value}</p>
  </div>
);

const LogEntry = ({ time, msg }) => (
  <div className="flex gap-4 items-center">
    <span className="text-[8px] font-black text-gray-600 bg-white/10 px-1.5 py-0.5">{time}</span>
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none">
      {msg}
    </p>
  </div>
);

export default AdminDashboard;