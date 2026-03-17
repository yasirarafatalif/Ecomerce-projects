import React from 'react';

const PremiumLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#F2F2F2]/90 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        
        {/* --- CENTRAL LOGO PULSE --- */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Rotating Line */}
          <div className="absolute inset-0 border-t-2 border-black rounded-full animate-spin duration-[1500ms]"></div>
          
          {/* Inner Pulsing Initial (Consistent with your brand logo) */}
          <div className="flex items-center justify-center animate-pulse">
             <div className="flex h-6 w-6">
                <div className="w-1/2 h-full bg-gray-400/50 -skew-x-[20deg]"></div>
                <div className="w-1/2 h-full bg-black -skew-x-[20deg] -ml-1"></div>
             </div>
          </div>

          {/* Grainy Texture within the circle */}
          <div className="absolute inset-0 rounded-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
        </div>

        {/* --- TEXTUAL ELEMENTS --- */}
        <div className="mt-10 flex flex-col items-center gap-2">
          {/* Animated Progress Bar */}
          <div className="w-40 h-[1px] bg-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 bg-black w-1/3 animate-[loading_1.5s_infinite_ease-in-out]"></div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900 italic">
              Loading
            </span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Curating your wardrobe...
            </span>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="absolute -bottom-32 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] italic">
          Est. 2024 / XIV Collections
        </div>
      </div>

      {/* Global Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      {/* Custom Keyframes for the Progress Line */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default PremiumLoader;