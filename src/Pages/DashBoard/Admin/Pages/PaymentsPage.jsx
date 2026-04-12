import React, { useState } from "react";
import { 
  CreditCard, Search, Filter, 
  ArrowUpRight, CheckCircle2, XCircle, 
  RotateCcw, DollarSign, Calendar, LayoutGrid
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";

const PaymentsPage = () => {
  const axiosSecure = useAxios();
  const [selectedStatus, setSelectedStatus] = useState("All");

  // --- 1. Fetching Payment Records ---
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-payments");
      return res.data.result; 
    },
  });

  // --- 2. Filter Logic ---
  const statusOptions = ["All", "Success", "Failed", "Refunded"];
  const filteredPayments = payments.filter(pay => 
    selectedStatus === "All" ? true : pay.status === selectedStatus
  );

  // if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      <title>ZERO FAISHON || PAYMENTS PAGE</title>
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic">Financials / Secure Vault</p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             TRANSACTION <br /> RECORDS.
          </h1>
        </div>

        {/* Search & Total Revenue Stat */}
        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
           <div className="flex items-center gap-6 pr-6 border-r border-gray-100 hidden md:flex text-right">
              <div>
                 <p className="text-[10px] font-black uppercase text-gray-400">Total Revenue</p>
                 <p className="text-xl font-black italic">BDT {payments.reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                 <DollarSign size={18} />
              </div>
           </div>
           
           <div className="relative group sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH TXN ID..." 
              className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-black outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* --- STATUS FILTER TABS --- */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
           <LayoutGrid size={14} className="text-gray-400" />
           <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Filter:</span>
        </div>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 whitespace-nowrap ${
              selectedStatus === status ? "text-black italic" : "text-gray-300 hover:text-black"
            }`}
          >
            {status}
            {selectedStatus === status && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
      </div>

      {/* --- PAYMENTS TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Transaction ID</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Citizen & Order</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Method</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Protocol Status</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Amount</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Terminal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPayments.length > 0 ? filteredPayments.map((pay) => (
                <tr key={pay._id} className="group/row hover:bg-gray-50/80 transition-all duration-300">
                  {/* Txn ID */}
                  <td className="p-8">
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-black uppercase tracking-tighter text-gray-900 truncate max-w-[120px]">
                          {pay.transactionId || "N/A"}
                       </span>
                       <ArrowUpRight size={12} className="text-gray-300 group-hover/row:text-black transition-all" />
                    </div>
                  </td>

                  {/* Citizen & Order Reference */}
                  <td className="p-8">
                    <div>
                       <p className="text-[10px] font-black uppercase italic tracking-tighter text-gray-900">{pay.userName || "Verified Citizen"}</p>
                       <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Order: #{pay.orderId?.slice(-6).toUpperCase()}</p>
                    </div>
                  </td>

                  {/* Payment Method */}
                  <td className="p-8">
                     <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">{pay.method || "Online"}</span>
                     </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border ${
                      pay.status === 'Success' ? 'bg-green-50 border-green-100 text-green-600' : 
                      pay.status === 'Refunded' ? 'bg-blue-50 border-blue-100 text-blue-600' : 
                      'bg-red-50 border-red-100 text-red-600'
                    }`}>
                      {pay.status === 'Success' && <CheckCircle2 size={12} />}
                      {pay.status === 'Failed' && <XCircle size={12} />}
                      {pay.status === 'Refunded' && <RotateCcw size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest italic">{pay.status}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-8 font-black text-xs text-gray-900 italic">
                     BDT {pay.amount}
                  </td>

                  {/* Terminal Action */}
                  <td className="p-8 text-right">
                     <button className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-black hover:border-black transition-all shadow-sm active:scale-90">
                        <span className="text-[9px] font-black uppercase tracking-widest">Details</span>
                     </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-[10px] font-black uppercase text-gray-300 italic tracking-[0.3em]">
                     No payment logs found in the vault.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;