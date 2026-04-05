import React, { useState } from "react";
import { 
  Settings, Globe, ShieldCheck, Bell, 
  Save, RefreshCcw, Camera, Mail, 
  Lock, LayoutGrid, Zap, EyeOff
} from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import { ShowProtocolUpdatedAlert } from "../../../Components/Shared/ShowProtocolUpdatedAlert";
import { ShowProtocolErrorAlert } from "../../../Components/Shared/ShowProtocolErrorAlert";


const SettingsPage = () => {
  const axiosSecure = useAxios();
  const [activeTab, setActiveTab] = useState("General");

  // --- General Settings State ---
  const [siteSettings, setSiteSettings] = useState({
    siteName: "XIV COLLECTIONS",
    siteEmail: "admin@xiv.com",
    maintenanceMode: false,
    currency: "BDT",
    footerText: "XIV COLLECTIONS — EST. 2024 — DHAKA",
  });

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
    
      // const res = await axiosSecure.patch("/admin/settings", siteSettings);
      ShowProtocolUpdatedAlert("CORE SETTINGS", "SYNCHRONIZED");
    } catch (err) {
      ShowProtocolErrorAlert("SYNC FAILURE", "VAULT ACCESS DENIED");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-24">
      
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-[2px] bg-blue-700"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-700 italic">System Configuration / Vault</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             SYSTEM <br /> <span className="text-blue-700">CONTROLS.</span>
          </h1>
        </div>

        <button 
          onClick={handleUpdateSettings}
          className="group bg-black text-white px-10 py-5 flex items-center gap-4 hover:bg-blue-700 transition-all shadow-2xl active:scale-95"
        >
           <Save size={18} className="group-hover:scale-110 transition-transform" />
           <span className="text-[11px] font-black uppercase tracking-[0.3em]">Save All Changes</span>
        </button>
      </div>

      {/* --- SETTINGS NAVIGATION TABS --- */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
        {["General", "Security", "Notifications", "Branding"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative pb-4 whitespace-nowrap ${
              activeTab === tab ? "text-black italic" : "text-gray-300 hover:text-black"
            }`}
          >
            {tab} Protocols
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
      </div>

      {/* --- SETTINGS CONTENT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        
        {/* Left Side: Forms (8 Cols) */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Section: Core Identity */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-black group-hover:bg-blue-700 transition-colors duration-700"></div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3 mb-10">
               <Globe size={20} className="text-blue-700" /> Core Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <SettingInput 
                  label="Site Nomenclature" 
                  value={siteSettings.siteName} 
                  onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})} 
               />
               <SettingInput 
                  label="Administrative Email" 
                  value={siteSettings.siteEmail} 
                  onChange={(e) => setSiteSettings({...siteSettings, siteEmail: e.target.value})} 
               />
               <div className="md:col-span-2">
                  <SettingInput 
                    label="Footer Signature" 
                    value={siteSettings.footerText} 
                    onChange={(e) => setSiteSettings({...siteSettings, footerText: e.target.value})} 
                  />
               </div>
            </div>
          </div>

          {/* Section: Operational Protocols */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-black group-hover:bg-blue-700 transition-colors"></div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3 mb-10">
               <Zap size={20} className="text-blue-700" /> Operational Protocols
            </h3>

            <div className="space-y-8">
               <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-900">Maintenance Protocol</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest italic">Offline mode for entire infrastructure</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={siteSettings.maintenanceMode} 
                      onChange={(e) => setSiteSettings({...siteSettings, maintenanceMode: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:bg-blue-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-none after:h-5 after:w-5 after:transition-all"></div>
                  </label>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <SettingInput label="Default Currency" value={siteSettings.currency} readOnly />
                  <SettingInput label="System Language" value="ENGLISH / BENGALI" readOnly />
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visuals & Security (4 Cols) */}
        <div className="xl:col-span-4 space-y-10">
          
          {/* Logo Branding */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 space-y-8">
             <h3 className="text-[11px] font-black uppercase italic tracking-widest border-b border-gray-50 pb-4 flex items-center gap-3">
                <Camera size={16} /> Visual Assets
             </h3>
             <div className="space-y-6">
                <div className="w-full aspect-video bg-gray-900 flex items-center justify-center relative group overflow-hidden">
                   <h2 className="text-2xl font-black italic tracking-tighter text-white">{siteSettings.siteName}</h2>
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="text-[9px] font-black uppercase tracking-widest text-white underline underline-offset-4 cursor-pointer">Replace Logo</button>
                   </div>
                </div>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed text-center">SVG / PNG — MAX 2MB — MIN 500PX</p>
             </div>
          </div>

          {/* Security Summary */}
          <div className="bg-gray-900 p-8 text-white space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={100} />
             </div>
             <h3 className="text-[11px] font-black uppercase italic tracking-widest border-b border-white/10 pb-4 flex items-center gap-3">
                <Lock size={16} className="text-blue-500" /> Security Intel
             </h3>
             <div className="space-y-4">
                <SecurityRow label="SSL Status" value="ENCRYPTED" status="success" />
                <SecurityRow label="Admin Access" value="2-FACTOR ACTIVE" status="success" />
                <SecurityRow label="Last Sync" value="2 MIN AGO" status="neutral" />
             </div>
             <button className="w-full py-4 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Security Audit
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---
const SettingInput = ({ label, value, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic group-focus-within:text-black transition-colors">{label}</label>
    <input 
      value={value} 
      {...props} 
      className="w-full bg-gray-50 border-b-2 border-transparent py-4 px-0 text-sm font-black uppercase outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-200 px-4" 
    />
  </div>
);

const SecurityRow = ({ label, value, status }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-3">
    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    <span className={`text-[9px] font-black uppercase italic ${status === 'success' ? 'text-blue-500' : 'text-gray-300'}`}>
      {value}
    </span>
  </div>
);

export default SettingsPage;