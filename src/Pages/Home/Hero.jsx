import React from 'react';
import { Search, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; // Aponar image path

const Hero = () => {
  return (
    <div className="relative py-8 min-h-screen w-full bg-[#f5f5f5] overflow-hidden font-sans">
      
      {/* Background Image with Opacity Control */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{ 
          backgroundImage: `url(${Img})`,
          opacity: 0.6 // Ekhane opacity komano hoyeche (0.1 theke 1 er moddhe thakbe)
        }}
      />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-16 py-10">
        
        {/* Top Section: Category & Search */}
        <div className="flex flex-col gap-6 max-w-xs">
          <div className="flex flex-col text-[13px] font-bold uppercase tracking-tighter text-gray-800">
            <a href="#" className="hover:opacity-50">Men</a>
            <a href="#" className="hover:opacity-50">Women</a>
            <a href="#" className="hover:opacity-50">Kids</a>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-black/5 border border-transparent group-hover:border-black/10 py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Middle Section: Hero Text & Products */}
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between gap-12 mt-12 md:mt-0">
          
          {/* Left: Heading */}
          <div className="flex flex-col mb-12">
            <h1 className="text-[60px] md:text-[85px] leading-[0.9] font-black uppercase text-gray-900 tracking-tighter">
              New <br /> Collection
            </h1>
            <p className="mt-4 text-gray-600 font-medium">
              Summer <br /> 2026
            </p>

            {/* CTA Button & Sliders */}
            <div className="mt-16 flex items-center gap-4">
              <button className="flex items-center gap-10 bg-black/10 hover:bg-black/20 transition-all px-6 py-4 rounded-sm group">
                <span className="text-sm font-bold uppercase tracking-widest">Go To Shop</span>
                <MoveRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </button>
              
              <div className="flex gap-2">
                <button className="p-4 border border-gray-300 hover:bg-white transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-4 border border-gray-300 hover:bg-white transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Images */}
          <div className="flex gap-6 items-end mb-12">
            {/* Product 1 */}
            <div className="w-[300px] aspect-[4/5] bg-white overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=400" 
                alt="Product 1" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Product 2 */}
            <div className="hidden lg:block w-[350px] aspect-[4/5] bg-white overflow-hidden shadow-2xl translate-y-[-20px]">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" 
                alt="Product 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;