import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  MapPin,
  Camera,
  Save,
  ChevronRight,
} from "lucide-react";
import Img from "../../../assets/bg-home1.png";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Lock size={16} /> },
    { id: "notifications", label: "Alerts", icon: <Bell size={16} /> },
    { id: "address", label: "Address", icon: <MapPin size={16} /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-24 md:pt-32 pb-20 font-sans overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${Img})`, opacity: 0.12 }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12">
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-gray-900">
            Settings.
          </h1>
          <p className="mt-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-700 italic">
            Manage your aesthetic identity
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          
          {/* --- SIDEBAR MENU (Responsive: Horizontal Scroll on Mobile) --- */}
          <aside className="w-full lg:w-64 bg-white/40 backdrop-blur-md border border-white/20 p-1 md:p-2 shadow-sm sticky top-20 z-20">
            <div className="flex lg:flex-col overflow-x-auto no-scrollbar lg:overflow-visible">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 lg:w-full flex items-center justify-between px-5 py-3 md:py-4 transition-all duration-300 group whitespace-nowrap ${
                    activeTab === item.id
                      ? "bg-black text-white"
                      : "hover:bg-gray-100/50 text-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {item.icon}
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`hidden lg:block ${
                      activeTab === item.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </aside>

          {/* --- RIGHT CONTENT AREA --- */}
          <main className="w-full flex-1 bg-white p-6 md:p-12 shadow-2xl relative">
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-10 md:mb-12 text-center sm:text-left">
                  <div className="relative group">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-gray-50 flex items-center justify-center font-black text-2xl md:text-3xl italic text-gray-300">
                      YA
                    </div>
                    <button className="absolute bottom-0 right-0 bg-black text-white p-2 md:p-2.5 rounded-full shadow-xl hover:scale-110 transition-transform">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">
                      Yasir Arafat
                    </h3>
                    <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Premium Member Since 2024
                    </p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <InputField label="First Name" placeholder="Yasir" />
                  <InputField label="Last Name" placeholder="Arafat" />
                  <div className="md:col-span-2">
                    <InputField label="Email Address" placeholder="yasir@xiv.com" type="email" />
                  </div>
                  <div className="md:col-span-2">
                    <InputField label="Phone Number" placeholder="+880 123 456 789" />
                  </div>

                  <div className="md:col-span-2 mt-4 md:mt-6">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black text-white px-10 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter italic mb-6 md:mb-8 border-b pb-4">
                  Security
                </h3>
                <form className="flex flex-col gap-5 md:gap-6 max-w-md">
                  <InputField label="Current Password" type="password" placeholder="••••••••" />
                  <InputField label="New Password" type="password" placeholder="••••••••" />
                  <InputField label="Confirm Password" type="password" placeholder="••••••••" />
                  <button className="w-full sm:w-auto bg-black text-white px-10 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl mt-4">
                    Update Password
                  </button>
                </form>
              </section>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter italic mb-6 md:mb-8 border-b pb-4">
                  Notifications
                </h3>
                <div className="space-y-6">
                  <ToggleOption label="Email Marketing" desc="Receive updates on new drops." />
                  <ToggleOption label="Order Status" desc="Get SMS updates on shipping." />
                </div>
              </section>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter italic mb-6 md:mb-8 border-b pb-4">
                  Shipping Address
                </h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <InputField label="Street Address" placeholder="123 Main St" />
                  </div>
                  <InputField label="City" placeholder="Dhaka" />
                  <InputField label="Postal Code" placeholder="1234" />
                  <div className="md:col-span-2">
                    <button className="w-full sm:w-auto bg-black text-white px-10 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 shadow-xl">
                      Update Address
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Grainy Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
          </main>
        </div>
      </div>
      
      {/* Hide scrollbar utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="bg-gray-50 border border-gray-100 py-3 md:py-4 px-4 md:px-5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all w-full"
    />
  </div>
);

const ToggleOption = ({ label, desc }) => (
  <div className="flex justify-between items-center py-2">
    <div>
      <p className="text-[11px] font-black uppercase tracking-widest">{label}</p>
      <p className="text-[9px] text-gray-400 font-bold uppercase">{desc}</p>
    </div>
    <div className="w-10 h-5 bg-black rounded-full relative cursor-pointer">
      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
    </div>
  </div>
);

export default AccountSettings;