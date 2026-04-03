import React, { useState } from "react";
import { 
  Ticket, Plus, Trash2, Calendar, 
  Percent, Tag, Search, CheckCircle2, 
  X, MousePointer2, Clock
} from "lucide-react";
import { useQuery} from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";

const CouponsPage = () => {
  const axiosSecure = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coupons = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data; 
    },
  });

  // --- 2. Add Coupon Handler ---
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      code: form.code.value.toUpperCase(),
      discount: parseInt(form.discount.value),
      expiryDate: form.expiry.value,
      status: "Active",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axiosSecure.post("/coupons", newCoupon);
      if (res.data.insertedId) {
        setIsModalOpen(false);
        Swal.fire({
          title: "COUPON INITIALIZED",
          text: "Discount protocol active.",
          icon: "success",
          background: "#000",
          color: "#fff"
        });
      }
    } catch (err) {
      Swal.fire("ERROR", "Failed to sync coupon.", "error");
    }
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "EXTRACT COUPON?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "DELETE",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupons/${id}`).then(() => {
         ShowProtocolUpdatedAlert("Coupon extracted from vault.", "success");
         refetch();
        });
      }
    });
  };

//   if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
        <title>CUPONS PAGE</title>
      
      {/* --- HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic">Marketing / Reward System</p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             COUPON <br /> VAULT.
          </h1>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-8 py-4 flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl active:scale-95"
        >
           <Plus size={16} />
           <span className="text-[10px] font-black uppercase tracking-widest">Create Discount</span>
        </button>
      </div>

      {/* --- COUPONS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="bg-white border border-gray-100 p-8 relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 flex items-center justify-center -rotate-45 translate-x-8 -translate-y-8 group-hover:bg-black transition-colors">
               <Ticket size={20} className="rotate-45 group-hover:text-white" />
            </div>
            
            <div className="space-y-6">
               <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-700 italic">Voucher Code</span>
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic text-gray-900 mt-1">{coupon.code}</h3>
               </div>

               <div className="flex justify-between items-end border-t border-dashed border-gray-100 pt-6">
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400">Benefit</p>
                    <p className="text-xl font-black italic">{coupon.discount}% OFF</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase text-gray-400">Expires</p>
                    <p className="text-[10px] font-bold uppercase">{new Date(coupon.expiryDate).toLocaleDateString('en-GB')}</p>
                  </div>
               </div>

               <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => handleDelete(coupon._id)}
                    className="flex-1 py-3 bg-gray-50 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >
                     Extract
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD COUPON MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleAddCoupon} className="relative bg-white w-full max-w-md p-10 shadow-2xl border-t-8 border-black animate-in zoom-in-95">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">New Coupon.</h2>
            
            <div className="space-y-6">
               <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Code</label>
                  <input name="code" required placeholder="E.G. XIV50" className="w-full bg-gray-50 py-4 px-4 text-xs font-black uppercase outline-none focus:ring-1 focus:ring-black" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Discount (%)</label>
                     <input name="discount" type="number" required placeholder="10" className="w-full bg-gray-50 py-4 px-4 text-xs font-black outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Expiry Date</label>
                     <input name="expiry" type="date" required className="w-full bg-gray-50 py-4 px-4 text-[10px] font-black outline-none uppercase" />
                  </div>
               </div>
               <button type="submit" className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">Initialize Protocol</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;