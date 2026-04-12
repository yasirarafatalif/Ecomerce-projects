import React from 'react';
import { MoveRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; 

const AboutUs = () => {
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

      <title>ZERO FAISHON || ABOUT US</title>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12">
        
        {/* --- 1. HERO SECTION (Story Intro) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 mb-4 italic">Since 2024</p>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic mb-8">
              Defining <br /> Modern <br /> Aesthetics.
            </h1>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-md uppercase tracking-wide">
              XIV Collections was born out of a desire to blend street-style bold aesthetics with high-end craftsmanship. We believe fashion is not just what you wear, but how you tell your story.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-white shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800" 
                alt="Brand Story" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -left-10 bg-black text-white p-8 hidden md:block">
               <span className="text-4xl font-black italic tracking-tighter">10K+</span>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Global Community</p>
            </div>
          </div>
        </div>

        {/* --- 2. OUR VALUES (Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: <Zap size={24}/>, title: "Creative Edge", desc: "Pushing the boundaries of design with every stitch." },
            { icon: <ShieldCheck size={24}/>, title: "Premium Quality", desc: "Sourcing only the finest sustainable materials." },
            { icon: <Globe size={24}/>, title: "Global Vision", desc: "Designed in Dhaka, crafted for the world." }
          ].map((item, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm p-10 border border-gray-200 group hover:bg-black hover:text-white transition-all duration-500">
               <div className="mb-6 text-blue-700 group-hover:text-white transition-colors">
                 {item.icon}
               </div>
               <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">{item.title}</h3>
               <p className="text-xs font-medium leading-loose uppercase tracking-widest opacity-60">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- 3. BIG QUOTE / PHILOSOPHY --- */}
        <div className="border-t border-b border-gray-300 py-20 text-center mb-32">
           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight max-w-4xl mx-auto">
             "We don't follow trends. <br /> We create the timeless pieces <br /> that define them."
           </h2>
           <p className="mt-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em]">The XIV Philosophy</p>
        </div>

        {/* --- 4. THE CRAFT (Image Grid) --- */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
             <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-6">The Craftsmanship</h2>
             <p className="text-[13px] text-gray-500 font-medium leading-relaxed uppercase tracking-widest mb-8">
               Every piece in our collection goes through months of sketching, prototyping, and testing. Our artisans focus on the minute details—from the reinforced stitching to the custom-made hardware.
             </p>
             <button className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] group">
                View Process <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="aspect-square bg-white overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1598454444233-9dc334394ed3?q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="craft"/>
             </div>
             <div className="aspect-square bg-white overflow-hidden shadow-lg mt-8">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="craft"/>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;