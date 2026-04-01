import React from "react";
import { 
  Package, Search, Filter, Eye, 
  Truck, CheckCircle, Clock, MoreVertical,
  ChevronRight, DollarSign, User
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // --- 1. Fetching All Orders ---
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-orders");
      return res.data.result; 
    },
  });
  console.log(orders)

  // --- 2. Update Order orderStatus Logic ---
  const handleUpdateorderStatus = (id, neworderStatus) => {
    axiosSecure.patch(`/orders/${id}`, { orderStatus: neworderStatus }).then((res) => {
      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries(["admin-orders"]);
        Swal.fire({
          title: "orderStatus UPDATED",
          text: `Order is now marked as ${neworderStatus}.`,
          icon: "success",
          background: "#000",
          color: "#fff",
          confirmButtonColor: "#3b82f6"
        });
      }
    });
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             ORDER  VAULT.
          </h1>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
           <div className="flex items-center gap-6 pr-6 border-r border-gray-100 hidden md:flex">
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase text-gray-400">Total Acquisitions</p>
                 <p className="text-xl font-black italic">{orders.length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                 <Package size={20} className="text-blue-700" />
              </div>
           </div>
           
           <div className="relative group sm:w-80 shadow-sm transition-all focus-within:shadow-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH BY ORDER ID..." 
              className="w-full bg-white border-none py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* --- ORDERS TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Order Reference</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">User Identity</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Acquisition Date</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Protocol orderStatus</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Revenue</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Terminal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order._id} className="group/row hover:bg-gray-50/80 transition-all duration-300">
                  {/* Order ID */}
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-black uppercase tracking-tighter text-gray-900">
                          #{order._id.toUpperCase()}
                       </span>
                       <button className="text-gray-300 hover:text-black transition-colors"><ChevronRight size={14}/></button>
                    </div>
                  </td>

                  {/* Customer Info */}
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User size={14} className="text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase italic tracking-tighter text-gray-900">{order.userName || "Guest Citizen"}</p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{order.userEmail}</p>
                       </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-8">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                     </p>
                  </td>

                  {/* orderStatus Badge */}
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none border ${
                      order.orderStatus === 'Delivered' ? 'bg-green-50 border-green-100 text-green-600' : 
                      order.orderStatus === 'Shipped' ? 'bg-blue-50 border-blue-100 text-blue-600' : 
                      'bg-orange-50 border-orange-100 text-orange-600'
                    }`}>
                      {order.orderStatus === 'Pending' && <Clock size={12} />}
                      {order.orderStatus === 'Shipped' && <Truck size={12} />}
                      {order.orderStatus === 'Delivered' && <CheckCircle size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest italic">{order.orderStatus}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-8">
                     <p className="text-[11px] font-black text-gray-900 uppercase italic tracking-tighter">
                        BDT {order.totalAmount}
                     </p>
                  </td>

                  {/* Actions (Update orderStatus) */}
                  <td className="p-8 text-right">
                     <div className="flex justify-end gap-2">
                        {order.orderStatus === 'Pending' && (
                          <button 
                            onClick={() => handleUpdateorderStatus(order._id, 'Shipped')}
                            className="p-2 bg-black hover:cursor-pointer text-white hover:bg-blue-700 transition-all shadow-lg"
                            title="Mark as Shipped"
                          >
                             <Truck size={14} />
                          </button>
                        )}
                        {order.orderStatus === 'Shipped' && (
                          <button 
                            onClick={() => handleUpdateorderStatus(order._id, 'Delivered')}
                            className="p-2 bg-blue-700 text-white hover:cursor-pointer hover:bg-green-600 transition-all shadow-lg"
                            title="Mark as Delivered"
                          >
                             <CheckCircle size={14} />
                          </button>
                        )}
                        <button className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-black transition-all">
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

      {/* --- EMPTY STATE --- */}
      {orders.length === 0 && (
        <div className="py-32 text-center bg-white border-2 border-dashed border-gray-100">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-200">Vault is Empty.</h3>
           <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 italic">No acquisitions recorded in the system.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;