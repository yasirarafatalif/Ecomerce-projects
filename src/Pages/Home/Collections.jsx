import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import Img from "../../assets/bg-home1.png"; 

const Collections = () => {
  const products = [
    { id: 1, category: "Cotton T-Shirt", title: "Basic Heavy Weight T-Shirt", price: "$199", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80" },
    { id: 2, category: "Denim Jeans", title: "Soft Wash Straight Fit Jeans", price: "$249", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",  },
    { id: 3, category: "Oversized T-Shirt", title: "Street Style Graphic Tee", price: "$179", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80" },
    { id: 4, category: "Hoodie", title: "Premium Cotton Hoodie", price: "$299", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80" },
    { id: 5, category: "Sneakers", title: "Urban Casual Sneakers", price: "$320", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80" },
    { id: 6, category: "Jacket", title: "Winter Casual Jacket", price: "$399", img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&auto=format&fit=crop&q=80" },
    { id: 7, category: "Cap", title: "Minimal Cotton Cap", price: "$79", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80" },
    { id: 8, category: "Shirt", title: "Classic White Formal Shirt", price: "$210", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="relative min-h-screen bg-[#f2f2f2] px-6 md:px-16 py-20 font-sans overflow-hidden">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: `url(${Img})`,
          opacity: 0.8 
        }}
      />

      {/* 2. Texture Overlay */}
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-gray-900 italic">
              XIV <br /> COLLECTIONS <br /> 25-26
            </h1>

            <div className="mt-10 flex gap-6 text-[12px] font-black uppercase tracking-widest text-gray-400">
              <button className="text-black border-b-2 border-black pb-1">(ALL)</button>
              <button className="hover:text-black transition-colors">Men</button>
              <button className="hover:text-black transition-colors">Women</button>
              <button className="hover:text-black transition-colors">KID</button>
            </div>
          </div>

          <div className="flex gap-12 mt-8 md:mt-0 text-[11px] font-black uppercase tracking-widest">
            <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">Filters(+)</button>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1">Sorts(-)</p>
              <span className="text-gray-400 block mt-1 lowercase font-normal leading-tight">
                Less to more <br /> More to Less
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mb-12" /> 

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className={`relative aspect-[3/4] bg-white overflow-hidden shadow-sm transition-all duration-500 ${product.featured ? 'ring-2 ring-blue-600 ring-offset-4' : ''}`}>
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5 backdrop-blur-[2px]">
                  <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Plus size={20} className="text-black" />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-5 flex justify-between items-start px-1">
                <div className="max-w-[80%]">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">
                    {product.category} <span className="text-gray-200 ml-1">+5</span>
                  </p>
                  <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-tighter leading-tight group-hover:underline">
                    {product.title}
                  </h3>
                </div>
                <span className="font-black text-[13px] text-gray-900">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer "More" Button */}
        <div className="flex flex-col items-center mt-24 group cursor-pointer">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors">
            Discover More
          </span>
          <ChevronDown
            size={24}
            className="text-gray-300 group-hover:text-black group-hover:translate-y-2 transition-all duration-300 mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Collections;