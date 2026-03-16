import React from 'react';
import { Tag, Timer, ArrowRight, ShoppingBag } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; 

const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: "Season End Sale",
      discount: "50% OFF",
      category: "Summer Collection",
      code: "SUMMER50",
      bg: "bg-black text-white",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800"
    },
    {
      id: 2,
      title: "New User Offer",
      discount: "20% OFF",
      category: "First Order Only",
      code: "WELCOME20",
      bg: "bg-white text-black border border-gray-200",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
    }
  ];

  const saleProducts = [
    { id: 1, title: "Linen Blend Shirt", oldPrice: "$199", newPrice: "$99", discount: "-50%", img: "https://static.zara.net/photos///2024/V/0/2/p/0679/402/800/2/w/563/0679402800_6_1_1.jpg" },
    { id: 2, title: "Slim Fit Chinos", oldPrice: "$250", newPrice: "$150", discount: "-40%", img: "https://static.zara.net/photos///2024/I/0/2/p/0858/451/251/2/w/563/0858451251_6_1_1.jpg" },
    { id: 3, title: "Denim Jacket", oldPrice: "$300", newPrice: "$180", discount: "-40%", img: "https://static.zara.net/photos///2024/V/0/2/p/0679/450/250/2/w/563/0679450250_6_1_1.jpg" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-28 pb-20 font-sans overflow-hidden">

        <title>Offers - Elegant Vogue</title>
      
      {/* Background Image Layer (Fixed Opacity Issue) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: `url(${Img})`,
          opacity: 0.5 // Content-ke transparent na kore shudhu bg-ke halka rakhar jonno
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12">
        
        {/* --- 1. HERO OFFERS BANNER --- */}
        <div className="flex flex-col lg:flex-row gap-6 mb-20">
          {offers.map((offer) => (
            <div key={offer.id} className={`relative flex-1 p-10 flex flex-col justify-between overflow-hidden min-h-[400px] ${offer.bg} shadow-sm group`}>
              <div className="absolute right-[-10%] top-[-10%] w-80 h-80 opacity-20 group-hover:scale-110 transition-transform duration-1000">
                 <img src={offer.img} alt="promo" className="w-full h-full object-cover grayscale" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.3em]">
                   <Tag size={14} /> Limited Time Offer
                </div>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic mb-4">
                  {offer.discount} <br /> {offer.title}
                </h2>
                <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{offer.category}</p>
              </div>

              <div className="relative z-10 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                 <div className="border-2 border-dashed border-current px-6 py-3">
                    <span className="text-[10px] block font-bold opacity-50 uppercase tracking-widest mb-1">Promo Code</span>
                    <span className="text-xl font-black tracking-widest uppercase">{offer.code}</span>
                 </div>
                 <button className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] group">
                    Shop Now <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- 2. FLASH SALE TIMER SECTION --- */}
        <div className="bg-blue-700 text-white p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm shadow-xl">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full">
                <Timer size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Flash Sale Ends In:</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">Don't miss out on these exclusive deals</p>
              </div>
           </div>
           
           <div className="flex gap-4 text-center">
              {[ {label: 'Hrs', val: '08'}, {label: 'Min', val: '45'}, {label: 'Sec', val: '12'} ].map(t => (
                <div key={t.label} className="bg-black/20 w-20 py-3 backdrop-blur-sm border border-white/10">
                   <span className="text-3xl font-black block">{t.val}</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{t.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* --- 3. ON-SALE PRODUCTS GRID --- */}
        <div>
          <div className="flex justify-between items-end mb-12 border-b border-gray-400/30 pb-6">
             <h2 className="text-4xl font-black uppercase tracking-tighter italic">Sale Items</h2>
             <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">32 items found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProducts.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest italic">
                    {p.discount}
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 p-2 shadow-xl border border-gray-100">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <h3 className="text-[13px] font-black uppercase tracking-tighter text-gray-800">{p.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[13px] font-black text-red-600">{p.newPrice}</span>
                    <span className="text-[11px] font-bold text-gray-400 line-through tracking-tighter">{p.oldPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OffersPage;