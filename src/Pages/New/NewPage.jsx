import React from 'react';
import { Plus, ShoppingBag, ArrowRight, Filter } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; 

const NewPage = () => {
  const newProducts = [
    { id: 1, title: "Abstract Print Shirt", price: "$129", tag: "Limited", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800", size: "tall" },
    { id: 2, title: "Tailored Linen Pants", price: "$180", tag: "New", img: "https://images.unsplash.com/photo-1624373666563-547590a04918?q=80&w=800", size: "square" },
    { id: 3, title: "Minimalist Trench", price: "$350", tag: "Exclusive", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", size: "square" },
    { id: 4, title: "Oversized Knitwear", price: "$210", tag: "New", img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=800", size: "tall" },
    { id: 5, title: "Structured Blazer", price: "$299", tag: "Featured", img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800", size: "square" },
    { id: 6, title: "Leather Chelsea Boots", price: "$240", tag: "New", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800", size: "square" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-28 pb-20 font-sans overflow-hidden">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: `url(${Img})`,
          opacity: 0.15 
        }}
      />
      <title>ZERO FAISHON || NEW PAGE</title>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-blue-700"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic">Spring Summer 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic">
              New <br /> Perspective.
            </h1>
          </div>
          <div className="flex items-center gap-8 border-b border-gray-300 pb-2">
            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-blue-700 transition-colors">
              <Filter size={14} /> Filter
            </button>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Showing 24 Results</span>
          </div>
        </div>

        {/* --- 2. EDITORIAL PRODUCT GRID (Masonry Style) --- */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {newProducts.map((p) => (
            <div key={p.id} className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden bg-white shadow-sm">
                {/* Product Tag */}
                <div className="absolute top-4 left-4 z-10 bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest italic">
                   {p.tag}
                </div>
                
                {/* Image */}
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className={`w-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 
                    ${p.size === 'tall' ? 'aspect-[3/5]' : 'aspect-[4/5]'}`}
                />

                {/* Hover Quick Add */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/5">
                   <button className="bg-white p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ShoppingBag size={20} className="text-black" />
                   </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-5 flex justify-between items-start px-1">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tighter italic text-gray-900 leading-tight">
                    {p.title}
                  </h3>
                  <button className="mt-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group/btn">
                    Details <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <span className="text-sm font-black text-gray-900">{p.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. NEWSLETTER / CALL TO ACTION --- */}
        <div className="mt-32 p-16 bg-white border border-gray-200 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
           <div className="relative z-10 transition-colors duration-700 group-hover:text-white">
             <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-6">Never miss a drop.</h2>
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-60 mb-10">Sign up for early access to our next collection.</p>
             <button className="border-b-2 border-current pb-2 text-sm font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                Subscribe Now
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default NewPage;