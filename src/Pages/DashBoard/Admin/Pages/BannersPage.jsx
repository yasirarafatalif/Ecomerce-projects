import React, { useState } from "react";
import { 
  Image as ImageIcon, Plus, Trash2, Edit3, 
  Eye, EyeOff, Link as LinkIcon, Monitor, 
  Smartphone, Zap, Save, X
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";
import Swal from "sweetalert2";

const BannersPage = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 1. FETCH BANNERS ---
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data.result;
    },
  });

  // --- 2. DELETE PROTOCOL ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "DECOMMISSION BANNER?",
      text: "This visual asset will be removed from the storefront.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "CONFIRM",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/banners/${id}`).then(() => {
          queryClient.invalidateQueries(["admin-banners"]);
          ShowProtocolUpdatedAlert("ASSET REMOVED", "DELETED");
        });
      }
    });
  };

//   if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-24">
      
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-[2px] bg-blue-700"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-700 italic">Visual Identity / Storefront Banners</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             BANNER <br /> <span className="text-blue-700">CAMPAIGNS.</span>
          </h1>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="group bg-black text-white px-10 py-5 flex items-center gap-4 hover:bg-blue-700 transition-all shadow-2xl active:scale-95"
        >
           <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
           <span className="text-[11px] font-black uppercase tracking-[0.3em]">Deploy New Asset</span>
        </button>
      </div>

      {/* --- BANNERS GRID --- */}
      <div className="grid grid-cols-1 gap-12">
        {banners.map((banner) => (
          <div key={banner._id} className="relative group bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
            
            {/* Banner Preview Area */}
            <div className="aspect-[21/9] w-full bg-gray-100 relative overflow-hidden">
               <img 
                 src={banner.imageUrl} 
                 alt={banner.title} 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
               />
               
               {/* Overlay Info */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent p-8 md:p-16 flex flex-col justify-center">
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">{banner.subtitle}</span>
                  <h2 className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter max-w-xl leading-none">
                    {banner.title}
                  </h2>
                  <div className="mt-8 flex gap-4">
                     <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase border border-white/20">
                        <LinkIcon size={12} /> {banner.linkTarget || "Main Shop"}
                     </div>
                  </div>
               </div>

               {/* Status Badge */}
               <div className={`absolute top-6 right-6 px-4 py-2 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 ${
                 banner.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'
               }`}>
                  {banner.status === 'Active' ? <Eye size={12}/> : <EyeOff size={12}/>}
                  {banner.status}
               </div>
            </div>

            {/* Terminal Actions (Bottom Bar) */}
            <div className="p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-8">
                  <Metric label="Position" value={banner.position || "Hero Main"} />
                  <Metric label="Device Focus" value={banner.device || "Omni-channel"} icon={<Monitor size={12}/>} />
                  <Metric label="Protocol Date" value={new Date(banner.createdAt).toLocaleDateString()} />
               </div>

               <div className="flex gap-4">
                  <button className="p-4 bg-gray-50 hover:bg-black hover:text-white transition-all border border-gray-100">
                     <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(banner._id)}
                    className="p-4 bg-gray-50 text-red-500 hover:bg-red-600 hover:text-white transition-all border border-gray-100"
                  >
                     <Trash2 size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- DEPLOY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <form className="relative bg-white w-full max-w-4xl p-12 shadow-2xl border-t-[12px] border-black animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-start mb-12">
               <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                  NEW <br /> <span className="text-blue-700 font-black">VISUAL PROTOCOL.</span>
               </h2>
               <button type="button" onClick={() => setIsModalOpen(false)}><X size={24}/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <Input label="Primary Title" placeholder="E.G. SUMMER ACQUISITION" />
                  <Input label="Subtitle Intel" placeholder="LIMITED RELEASE // 2026" />
                  <Input label="Redirect URL" placeholder="/collections/new-drops" icon={<LinkIcon size={14}/>} />
               </div>
               <div className="space-y-6">
                  <Input label="Banner Image URL" placeholder="https://image-vault.com/banner.jpg" icon={<ImageIcon size={14}/>} />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 italic">Positioning</label>
                       <select className="w-full bg-gray-50 py-4 px-4 text-xs font-black outline-none border-b-2 border-transparent focus:border-black transition-all">
                          <option>Main Hero</option>
                          <option>Promo Mid</option>
                          <option>Footer Announcement</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 italic">Device Scope</label>
                       <select className="w-full bg-gray-50 py-4 px-4 text-xs font-black outline-none border-b-2 border-transparent focus:border-black transition-all">
                          <option>Desktop Only</option>
                          <option>Mobile Only</option>
                          <option>Universal</option>
                       </select>
                    </div>
                  </div>
               </div>
            </div>

            <button type="submit" className="mt-12 w-full bg-black text-white py-6 text-[12px] font-black uppercase tracking-[0.5em] hover:bg-blue-700 transition-all shadow-xl active:scale-[0.98]">
               DEPLOY TO STOREFRONT
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const Metric = ({ label, value, icon }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <p className="text-[8px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-[11px] font-black uppercase italic text-gray-900 tracking-tight">{value}</p>
  </div>
);

const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input 
        {...props} 
        className={`w-full bg-gray-50 border-b-2 border-transparent py-4 ${icon ? 'pl-12' : 'px-4'} pr-4 text-xs font-black uppercase outline-none focus:border-black transition-all`} 
      />
    </div>
  </div>
);

export default BannersPage;