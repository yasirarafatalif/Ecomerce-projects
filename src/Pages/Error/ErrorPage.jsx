import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { ArrowLeft, Home, ShieldAlert, Zap } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 font-sans overflow-hidden relative">
      <title>ZERO FAISHON || ERROR-PAGE</title>
      
      {/* --- BACKGROUND DECORATION (Watermark Style) --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[25vw] font-black text-gray-50 leading-none tracking-tighter italic">
          ERROR.
        </h1>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        
        {/* --- ERROR ICON & CODE --- */}
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 bg-black text-white flex items-center justify-center animate-bounce">
              <Zap size={32} />
           </div>
           <h2 className="text-8xl md:text-[12rem] font-black italic tracking-tighter text-gray-900 leading-none">
              404
           </h2>
        </div>

        {/* --- MESSAGE --- */}
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest italic text-black">
             VAULT ACCESS DENIED / PATH NOT FOUND.
          </h3>
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.4em] max-w-md mx-auto leading-loose italic">
             The coordinate you are trying to reach does not exist in the XIV collective infrastructure. 
             Status: {error?.statusText || error?.message || "DISCONNECTED"}
          </p>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Previous Coordinate
          </button>

          <div className="hidden sm:block w-[1px] h-8 bg-gray-200"></div>

          <Link to="/">
            <button className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-2xl flex items-center gap-3 active:scale-95">
              <Home size={16} />
              Return to Base
            </button>
          </Link>
        </div>
      </div>

      {/* --- FOOTER LOGO --- */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">
          XIV COLLECTIONS © 2026
        </span>
        <div className="w-12 h-[2px] bg-gray-100"></div>
      </div>

    </div>
  );
};

export default ErrorPage;