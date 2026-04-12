import React from "react";
import { 
  RotateCcw, Search, Clock, 
  AlertCircle, ChevronRight, Package,
  ArrowRight, ShieldCheck
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import PremiumSpinner from "../../Components/Shared/PremiumSpinner";
import Img from "../../assets/bg-home1.png"; // --- Image Import ---

const MyReturns = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const email = user?.email;

  const { data: returns = [], isLoading } = useQuery({
    queryKey: ["my-returns", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/my-returns?email=${email}`);
      return res.data.result;
    },
  });

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-28 pb-20 font-sans overflow-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${Img})`, opacity: 0.4 }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-12">
        <title>ZERO FAISHON || MY RETURNS PAGE</title>
        
        {/* HEADER */}
        <div className="mb-12 border-b border-gray-200 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw size={20} className="text-blue-700 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700">Reverse Logistics</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-gray-900 leading-none">
            Return Requests.
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-6 max-w-md">
            Tracking your aesthetic reconsiderations and protocol status.
          </p>
        </div>

        {/* RETURNS LIST */}
        <div className="space-y-6">
          {returns.length > 0 ? (
            returns.map((item) => (
              <div key={item._id} className="bg-white/80 backdrop-blur-sm border border-transparent hover:border-black transition-all duration-500 group shadow-sm">
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                  
                  {/* Product Visual */}
                  <div className="w-24 h-32 bg-gray-100 shrink-0 overflow-hidden relative shadow-sm">
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt="" 
                    />
                  </div>

                  {/* Core Info */}
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-black text-blue-700 uppercase tracking-widest mb-1">Ref: {item.orderId}</p>
                        <h4 className="text-xl font-black uppercase tracking-tighter italic text-gray-900 leading-none">
                          {item.productName}
                        </h4>
                      </div>
                      {/* Status Badge */}
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-100">
                        <Clock size={12} className="text-orange-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">{item.deliveryStatus}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-50">
                      <DataBlock label="Reason" value={item.returnReason} isHighlight />
                      <DataBlock label="Size/Qty" value={`${item.size} / ${item.totalQuantity}`} />
                      <DataBlock label="Price" value={`BDT ${item.productPrice}`} />
                      <DataBlock label="Initiated" value={new Date(item.cardAt).toLocaleDateString('en-GB')} />
                    </div>

                    {/* Return Note Area */}
                    <div className="p-4 bg-white/40 border-l-2 border-gray-200 backdrop-blur-sm">
                       <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1 italic">Citizen Intelligence (Note):</p>
                       <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight leading-relaxed">
                          "{item.returnNote || "No additional intel provided."}"
                       </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 w-full lg:w-auto relative z-10">
                    <button className="flex-1 lg:w-32 py-3 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">
                       Status Detail
                    </button>
                    <button className="flex-1 lg:w-32 py-3 border border-gray-200 text-[9px] font-black uppercase tracking-widest hover:border-black transition-all bg-white/50">
                       Contact Support
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="py-32 text-center bg-white/60 backdrop-blur-md border-2 border-dashed border-gray-200 relative z-10">
               <RotateCcw size={40} className="mx-auto text-gray-100 mb-6" />
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-300">No reverse protocols <br /> initiated.</h3>
               <Link to="/dashboard/my-orders" className="mt-8 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 underline underline-offset-4">
                  Back to Order Vault
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DataBlock = ({ label, value, isHighlight }) => (
  <div className="space-y-1">
    <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">{label}</p>
    <p className={`text-[10px] font-black uppercase tracking-widest ${isHighlight ? 'text-blue-700 italic' : 'text-gray-900'}`}>
      {value}
    </p>
  </div>
);

export default MyReturns;