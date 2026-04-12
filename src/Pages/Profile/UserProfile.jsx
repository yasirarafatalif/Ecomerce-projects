import React, { useContext } from "react";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Package,
  Heart,
  Settings,
  ChevronRight,
} from "lucide-react";

import PremiumSpinner from "../../Components/Shared/PremiumSpinner";
import BgImg from "../../assets/bg-home1.png";
import useAuth from "../../Hooks/useAuth";

const UserProfile = () => {
  const { user, loading } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  if (!loading) return <PremiumSpinner />;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f2] p-6 text-center">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-gray-900">
          Access Denied.
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
          Please identify as a member to view this section.
        </p>
        <button className="bg-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">
          Sign In Here
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f2f2f2] pt-32 pb-20 font-sans overflow-hidden">
      <title>{user.name} Profile</title>
      {/* 1. Background Aesthetic Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `url(${BgImg})` }}
      />
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 mb-2 italic">
              XIV Collective /
              {
                user?.role ==="user" && "Member Dashboard"
              }
               
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors group"
          >
            Terminal Logout{" "}
            <LogOut
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT: Profile Summary Card --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 shadow-2xl relative border-t-4 border-black">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 mx-auto border-2 border-dashed border-gray-300">
                <User size={40} className="text-gray-300" />
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Identification
                  </p>
                  <p className="text-sm font-black text-gray-900 uppercase italic">
                    {user.name}
                  </p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Communication
                  </p>
                  <p className="text-sm font-black text-gray-900 uppercase italic">
                    {user.email}
                  </p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Membership Rank
                  </p>
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-blue-700" />
                    <p className="text-sm font-black text-blue-700 uppercase italic">
                      {user.role || "Collective Member"}
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-10 w-full border border-gray-200 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Edit Identification
              </button>
            </div>
          </div>

          {/* --- RIGHT: Member Activity Section --- */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Order History",
                  icon: <Package size={20} />,
                  desc: "Track your aesthetic acquisitions",
                },
                {
                  label: "Saved Items",
                  icon: <Heart size={20} />,
                  desc: "Your curated wishlist",
                },
                {
                  label: "Account Security",
                  icon: <Shield size={20} />,
                  desc: "Manage member credentials",
                },
                {
                  label: "Preferences",
                  icon: <Settings size={20} />,
                  desc: "Customize your XIV experience",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 backdrop-blur-sm p-8 border border-white hover:border-black transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white shadow-md text-gray-900 group-hover:bg-black group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-300 group-hover:text-black group-hover:translate-x-2 transition-all"
                    />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tighter mb-1 italic">
                    {item.label}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Premium Notice Section */}
            <div className="bg-black p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">
                  Member Exclusive Access.
                </h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black max-w-[400px]">
                  Aponar membership rank ekhon "Silver" status-e ache. Notun
                  "XIV / 26" collection ashle apni 24 ghonta age access paben.
                </p>
              </div>
              {/* Visual Aesthetic Circle */}
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-blue-700/20 rounded-full blur-[80px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
