import React, { useState } from 'react';
import { ShoppingBag, X, Heart, ArrowRight, LayoutGrid, Square, Trash2, Filter } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; 

const WishlistPage = () => {
  const [cols, setCols] = useState(4); // Grid layout control

  const wishlistItems = [
    { id: 1, title: "Basic Slim Fit T-Shirt", category: "Cotton T-Shirt", price: "$199", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500", inStock: true },
    { id: 2, title: "Soft Wash Straight Jeans", category: "Denim Jeans", price: "$249", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500", inStock: true },
    { id: 3, title: "Embroidered Seersucker Shirt", category: "V-Neck T-Shirt", price: "$120", img: "https://static.zara.net/photos///2024/V/0/2/p/0679/402/800/2/w/563/0679402800_6_1_1.jpg", inStock: false },
    { id: 4, title: "Oversized Knitwear", category: "Knitwear", price: "$210", img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=800", inStock: true },
  ];

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-32 pb-20 font-sans overflow-hidden">
      
      {/* Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${Img})`, opacity: 0.12 }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16">
        
        {/* --- 1. TOP HEADER & CONTROLS --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-gray-200 pb-10">
          <div className="max-w-xl">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic text-gray-900">
              SAVED <br /> PIECES.
            </h1>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.4em] text-blue-700 italic">
              Carefully curated by you / {wishlistItems.length} Items
            </p>
          </div>

          <div className="flex items-center gap-10">
            {/* Grid Switcher (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-4 border-r border-gray-300 pr-10">
              <button onClick={() => setCols(2)} className={`transition-all ${cols === 2 ? 'text-black' : 'text-gray-300'}`}>
                <LayoutGrid size={20} />
              </button>
              <button onClick={() => setCols(4)} className={`transition-all ${cols === 4 ? 'text-black' : 'text-gray-300'}`}>
                <Square size={20} className="rotate-45" />
              </button>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
              <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group underline-offset-8 underline decoration-gray-300">
                Move All to Bag <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                <Trash2 size={12} /> Clear List
              </button>
            </div>
          </div>
        </div>

        {/* --- 2. WISHLIST DYNAMIC GRID --- */}
        <div className={`grid gap-x-8 gap-y-16 transition-all duration-500 ${
          cols === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {wishlistItems.map((item) => (
            <div key={item.id} className="group flex flex-col">
              
              {/* Product Card Container */}
              <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
                {/* Remove Trigger */}
                <button className="absolute top-4 right-4 z-30 p-2.5 bg-white/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white">
                  <X size={16} />
                </button>

                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />

                {/* Stock Warning */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-y border-white py-2 w-full">Out of Season</p>
                  </div>
                )}

                {/* Quick Add To Bag (Only in stock) */}
                {item.inStock && (
                  <button className="absolute bottom-0 left-0 w-full bg-black text-white py-5 flex items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <ShoppingBag size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Move to Bag</span>
                  </button>
                )}
              </div>

              {/* Information & Details */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{item.category}</p>
                  <span className="text-sm font-black text-gray-900">{item.price}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tighter italic text-gray-800 leading-none group-hover:underline">
                  {item.title}
                </h3>
                <div className="mt-4 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase ml-2">+ More Colors</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- 3. EMPTY STATE HELP --- */}
        <div className="mt-40 pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex gap-10 items-center">
             <div className="flex flex-col">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share My List</span>
               <div className="flex gap-4 mt-2">
                 <button className="text-xs font-bold uppercase underline">Copy Link</button>
                 <button className="text-xs font-bold uppercase underline">Email</button>
               </div>
             </div>
           </div>
           
           <button className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-2xl active:scale-95">
              Continue Shopping
           </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;