import React, { useState } from "react";
import { 
  RotateCcw, Search, CheckCircle, XCircle, 
  Eye, Package, User, Clock, Filter,
  ArrowUpRight, LayoutGrid
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";

const AdminReturns = () => {
  const axiosSecure = useAxios();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data: returnRequests = [], isLoading , refetch} = useQuery({
    queryKey: ["admin-returns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-returns");
      return res.data.result; 
    },
  });


  const handleUpdateReturn = (id, newStatus) => {
    Swal.fire({
      title: "AUTHORIZE PROTOCOL?",
      text: `Update status to ${newStatus.toUpperCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "CONFIRM",
      background: "#fff",
      color: "#000",
      backdrop: `rgba(0,0,0,0.5) backdrop-blur-sm`,
      customClass: {
        popup: 'rounded-none border-t-8 border-black',
        title: 'font-black italic uppercase tracking-tighter',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin-returns/${id}`, { returnStatus: newStatus }).then((res) => {
          if (res.data.success) {
            ShowProtocolUpdatedAlert("Return status updated successfully!", newStatus);
            refetch();
          }
        });
      }
    });
  };

  const filtered = returnRequests.filter(item => 
    selectedFilter === "All" ? true : item.returnStatus === selectedFilter
  );

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
        <title>ADMIN REQUEST RETURNS PAGE</title>
      
      {/* --- HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
        
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             RETURN MANAGEMENT.
          </h1>
        </div>

        <div className="flex items-center gap-6 pr-6 border-r border-gray-100 hidden md:flex text-right">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Pending Requests</p>
            <p className="text-xl font-black italic">{returnRequests.filter(r => r.deliveryStatus === "Return Requested").length}</p>
          </div>
          <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center">
            <RotateCcw size={18} />
          </div>
        </div>
      </div>

      {/* --- FILTER TABS --- */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200 text-gray-400">
           <LayoutGrid size={14} />
           <span className="text-[9px] font-black uppercase tracking-widest">Filter:</span>
        </div>
        {["All", "Requested", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedFilter(status)}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 whitespace-nowrap ${
              selectedFilter === status ? "text-black italic" : "text-gray-300 hover:text-black"
            }`}
          >
            {status.toUpperCase()}
            {selectedFilter === status && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
      </div>

      {/* --- RETURNS TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Item Details</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Citizen & Reason</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Status Protocol</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Revenue Impact</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Terminal Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item) => (
                <tr key={item._id} className="group/row hover:bg-gray-50/80 transition-all duration-300">
                  
                  {/* Product Info */}
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-16 bg-gray-100 border border-gray-100 overflow-hidden">
                          <img src={item.img} className="w-full h-full object-cover grayscale group-hover/row:grayscale-0 transition-all" alt="" />
                       </div>
                       <div>
                          <p className="text-[11px] font-black uppercase italic tracking-tighter text-gray-900 leading-none">{item.productName}</p>
                          <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mt-1">Size: {item.size} | ID: {item.orderId?.slice(-6).toUpperCase()}</p>
                       </div>
                    </div>
                  </td>

                  {/* Customer & Reason */}
                  <td className="p-8">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-gray-900">{item.buyerEmail?.split('@')[0]}</p>
                       <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-50 text-blue-700 italic border border-blue-100">
                          {item.returnReason}
                       </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border ${
                      item.deliveryStatus === 'Approved' ? 'bg-green-50 border-green-100 text-green-600' : 
                      item.deliveryStatus === 'Rejected' ? 'bg-red-50 border-red-100 text-red-600' : 
                      'bg-orange-50 border-orange-100 text-orange-600'
                    }`}>
                      {item.deliveryStatus === 'Requested' ? <Clock size={12} /> : <CheckCircle size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest italic">{item.deliveryStatus}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-8 font-black text-xs text-gray-900 italic">
                     BDT {item.productPrice}
                  </td>

                  {/* Actions */}
                  <td className="p-8 text-right">
                     <div className="flex justify-end gap-2  group-hover/row:opacity-100 translate-x-4 group-hover/row:translate-x-0 transition-all duration-500">
                        {item.returnStatus === 'Pending' && (
                          <>
                             <button 
                               onClick={() => handleUpdateReturn(item._id, 'Approved')}
                               className="p-2 bg-black text-white hover:bg-green-600 transition-all shadow-lg cursor-pointer"
                               title="Approve Return"
                             >
                                <CheckCircle size={14} />
                             </button>
                             <button 
                               onClick={() => handleUpdateReturn(item._id, 'Rejected')}
                               className="p-2 bg-black text-white hover:bg-red-600 transition-all shadow-lg cursor-pointer"
                               title="Reject Return"
                             >
                                <XCircle size={14} />
                             </button>
                          </>
                        )}
                        <button className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-black transition-all cursor-pointer">
                           <Eye size={14} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReturns;