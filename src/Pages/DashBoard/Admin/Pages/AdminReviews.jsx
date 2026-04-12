import React, { useState } from "react";
import { 
  Star, Search, Trash2, Eye, 
  CheckCircle, MessageSquare, Filter,
  User, Package, EyeOff, LayoutGrid,
  ArrowUpRight
} from "lucide-react";
import { useQuery} from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";
import Swal from "sweetalert2";

const AdminReviews = () => {
  const axiosSecure = useAxios();
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reviews");
      return res.data.result; 
    },
  });

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Hidden" : "Approved";
    
    axiosSecure.patch(`/admin/reviews/${id}`, { status: newStatus }).then((res) => {
      if (res.data.modifiedCount > 0) {
        ShowProtocolUpdatedAlert("REVIEW VISIBILITY", newStatus);
      }
    });
  };

  // --- 3. Delete Review Protocol ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "EXTRACT REVIEW?",
      text: "This user feedback will be permanently removed from the vault.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "DELETE",
      background: "#fff",
      color: "#000"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/reviews/${id}`).then(() => {
          ShowProtocolUpdatedAlert("REVIEW", "EXTRACTED");
        });
      }
    });
  };

  const filteredReviews = reviews.filter(rev => 
    selectedStatus === "All" ? true : rev.status === selectedStatus
  );

//   if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-24">
      <title>ZERO FAISHON || ADMIN REVIEWS</title>
      
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-[2px] bg-blue-700"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-700 italic">User Intelligence / Feedbacks</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             REVIEW <br /> <span className="text-blue-700">PROTOCOLS.</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
           <div className="text-right hidden md:block">
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Global Avg. Rating</p>
              <p className="text-xl font-black italic flex items-center justify-end gap-2">
                 4.8 <Star size={16} className="fill-blue-700 text-blue-700" />
              </p>
           </div>
           <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
              <MessageSquare size={20} />
           </div>
        </div>
      </div>

      {/* --- FILTER NAVIGATION --- */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
        {["All", "Approved", "Hidden"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative pb-4 whitespace-nowrap ${
              selectedStatus === tab ? "text-black italic" : "text-gray-300 hover:text-black"
            }`}
          >
            {tab} Feedbacks
            {selectedStatus === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
      </div>

      {/* --- REVIEWS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredReviews.map((rev) => (
          <div key={rev._id} className="bg-white border border-gray-100 group hover:border-black transition-all duration-700 overflow-hidden flex flex-col sm:flex-row">
            
            {/* Left: Product & User Visual */}
            <div className="sm:w-32 bg-gray-50 p-6 flex flex-col items-center justify-center gap-4 border-b sm:border-b-0 sm:border-r border-gray-100">
               <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center rounded-none relative overflow-hidden">
                  <img src={rev.productImg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
               </div>
               <div className="text-center">
                  <p className="text-[9px] font-black uppercase tracking-tighter text-gray-900 truncate w-24 leading-none">{rev.userName}</p>
                  <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Verified</p>
               </div>
            </div>

            {/* Right: Content & Actions */}
            <div className="flex-1 p-8 space-y-6 relative">
               <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < rev.rating ? "fill-blue-700 text-blue-700" : "text-gray-200"} />
                     ))}
                  </div>
                  <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</span>
               </div>

               <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-blue-700 italic tracking-widest flex items-center gap-2">
                     <Package size={12}/> {rev.productName}
                  </h4>
                  <p className="text-[11px] font-bold text-gray-600 uppercase italic leading-relaxed">
                     "{rev.comment}"
                  </p>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${rev.status === 'Approved' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`}></div>
                     <span className="text-[9px] font-black uppercase tracking-widest italic">{rev.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <button 
                        onClick={() => handleToggleStatus(rev._id, rev.status)}
                        className="text-gray-300 hover:text-black transition-colors"
                        title={rev.status === "Approved" ? "Hide from Site" : "Approve Review"}
                     >
                        {rev.status === "Approved" ? <EyeOff size={16} /> : <CheckCircle size={16} />}
                     </button>
                     <button 
                        onClick={() => handleDelete(rev._id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        title="Delete Permanently"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {filteredReviews.length === 0 && (
        <div className="py-32 text-center bg-white border-2 border-dashed border-gray-100">
           <MessageSquare size={40} className="mx-auto text-gray-100 mb-6" />
           <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-300">Vault Intelligence <br /> is Empty.</h3>
        </div>
      )}
    </div>
  );
};

// Reusable Stat Component
const Metric = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">{icon} {label}</p>
    <p className="text-[10px] font-black uppercase italic text-gray-900 leading-none">{value}</p>
  </div>
);

export default AdminReviews;