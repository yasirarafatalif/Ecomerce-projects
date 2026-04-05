import React, { useState } from "react";
import { 
  Ticket, Plus, Trash2, Calendar, 
  Search, Clock, Users, ShoppingCart, 
  ArrowUpRight, X, Edit3, Tag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";
import { ShowProtocolErrorAlert } from "../../../../Components/Shared/ShowProtocolErrorAlert";

const CouponsPage = () => {
  const axiosSecure = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null); // Edit korar somoy data dhore rakhar jonno

  const { data: coupons = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data.result || res.data; 
    },
  });

  // --- Open Modal for Edit ---
  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  // --- Add or Update Handler ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const couponData = {
      couponCode: form.couponCode.value.toUpperCase(),
      discountValue: parseInt(form.discountValue.value),
      discountType: form.discountType.value,
      expiryDate: form.expiryDate.value,
      minimumOrderAmount: parseInt(form.minimumOrderAmount.value),
      usageLimit: parseInt(form.usageLimit.value),
      perUserLimit: parseInt(form.perUserLimit.value),
      applicableCategories: form.applicableCategories.value.split(",").map(c => c.trim().toUpperCase()),
      description: form.description.value,
      status: editingCoupon ? editingCoupon.status : "Active",
    };

    try {
      let res;
      if (editingCoupon) {
      
        res = await axiosSecure.patch(`/coupons/${editingCoupon._id}`, couponData);
        if (res.data.success) {
          ShowProtocolUpdatedAlert("Coupon Updated.", "success");
        }
      } else {
        
        couponData.usedCount = 0;
        couponData.createdAt = new Date().toISOString();
        res = await axiosSecure.post("/coupons", couponData);
        if (res.data.success) {
          ShowProtocolUpdatedAlert("New Coupon Initialized.", "success");
        }
      }
      
      setIsModalOpen(false);
      setEditingCoupon(null);
      refetch();
    } catch (err) {
     ShowProtocolErrorAlert("Operation Failed", err.response?.data?.message || err.message || "An unexpected error occurred.");
     setIsModalOpen(false);

    }
  };

  const handleDelete = (id) => {

    Swal.fire({
      title: "EXTRACT FROM VAULT?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "DELETE",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupons/${id}`).then(() => {
          ShowProtocolUpdatedAlert("Coupon extracted.", "success");
          refetch();
        });
      }
    });
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      <title>CUPONS PAGE</title>
      
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
         
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             COUPON ARCHIVE.
          </h1>
        </div>

        <button 
          onClick={() => { setEditingCoupon(null); setIsModalOpen(true); }}
          className="bg-black text-white px-8 py-4 flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl active:scale-95"
        >
           <Plus size={16} />
           <span className="text-[10px] font-black uppercase tracking-widest">Initialize Coupon</span>
        </button>
      </div>

      {/* COUPONS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="bg-white border border-gray-100 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
            <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-gray-200 relative">
               <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Voucher Identity</p>
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic text-gray-900">{coupon.couponCode}</h3>
               </div>
               <div className="pt-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest italic">
                     {coupon.discountValue}{coupon.discountType === 'fixed' ? ' BDT' : '%'} OFF
                  </div>
               </div>
               <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-white rounded-full hidden md:block border-l border-gray-200"></div>
            </div>

            <div className="flex-1 p-8 space-y-6">
               <div className="grid grid-cols-3 gap-4">
                  <Metric label="Usage" value={`${coupon.usedCount}/${coupon.usageLimit}`} icon={<Users size={12}/>} />
                  <Metric label="Min" value={`${coupon.minimumOrderAmount}`} icon={<ShoppingCart size={12}/>} />
                  <Metric label="Exp" value={new Date(coupon.expiryDate).toLocaleDateString('en-GB')} icon={<Clock size={12}/>} />
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${coupon.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`}></div>
                     <span className="text-[9px] font-black uppercase tracking-widest italic">{coupon.status}</span>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => handleEditClick(coupon)} className="text-gray-300 hover:text-blue-700 transition-colors"><Edit3 size={16} /></button>
                     <button onClick={() => handleDelete(coupon._id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- REUSABLE MODAL (Add & Edit) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleFormSubmit} className="relative bg-white w-full max-w-2xl p-10 shadow-2xl border-t-8 border-black animate-in zoom-in-95 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                  {editingCoupon ? "Modify Protocol." : "New Protocol."}
               </h2>
               <button type="button" onClick={() => setIsModalOpen(false)}><X size={24}/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <Input label="Coupon Code" required name="couponCode" defaultValue={editingCoupon?.couponCode} placeholder="E.G. HOODIE50" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Discount Value" required name="discountValue" type="number" defaultValue={editingCoupon?.discountValue} placeholder="50" />
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-gray-400">Type</label>
                      <select name="discountType" defaultValue={editingCoupon?.discountType || "fixed"} className="w-full bg-gray-50 py-4 px-4 text-xs font-black outline-none border-none">
                        <option value="fixed">FIXED</option>
                        <option value="percentage">PERCENT</option>
                      </select>
                    </div>
                  </div>
                  <Input label="Expiry Date" required name="expiryDate" type="datetime-local" defaultValue={editingCoupon?.expiryDate ? new Date(editingCoupon.expiryDate).toISOString().slice(0, 16) : ""} />
               </div>

               <div className="space-y-6">
                  <Input label="Min. Order Amount" required name="minimumOrderAmount" type="number" defaultValue={editingCoupon?.minimumOrderAmount} placeholder="1200" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Total Usage Limit" required name="usageLimit" type="number" defaultValue={editingCoupon?.usageLimit} placeholder="80" />
                    <Input label="Per User Limit" required name="perUserLimit" type="number" defaultValue={editingCoupon?.perUserLimit} placeholder="2" />
                  </div>
                  <Input label="Categories (Comma Separated)" required name="applicableCategories" defaultValue={editingCoupon?.applicableCategories?.join(", ")} placeholder="HOODIES, T-SHIRTS" />
               </div>
            </div>

            <div className="mt-8 space-y-4">
               <textarea name="description" defaultValue={editingCoupon?.description} placeholder="COUPON DESCRIPTION..." className="w-full bg-gray-50 p-4 text-[10px] font-black uppercase outline-none min-h-[100px]"></textarea>
               <button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-700 transition-all">
                  {editingCoupon ? "Update Protocol Intelligence" : "Initialize Acquisition Reward"}
               </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const Metric = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">{icon} {label}</p>
    <p className="text-[10px] font-black uppercase italic text-gray-900 leading-none">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{label}</label>
    <input {...props} className="w-full bg-gray-50 border-none py-4 px-4 text-xs font-black uppercase outline-none focus:ring-1 focus:ring-black transition-all" />
  </div>
);

export default CouponsPage;