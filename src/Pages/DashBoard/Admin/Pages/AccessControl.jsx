import React, { useState } from "react";
import { 
  ShieldCheck, ShieldAlert, User, 
  Search, Filter, CheckCircle2, 
  MoreVertical, Lock, Unlock, Activity
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import useRole from "../../../../Hooks/useRole";

const AccessControl = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const {role}= useRole();

  // --- 1. Fetching All Citizens ---
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["access-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?userRole=${role}`);
      return res.data.result; 
    },
  });
  console.log(users)

  // --- 2. Dynamic Role Update Logic ---
  const handleRoleToggle = (user, newRole) => {
    Swal.fire({
      title: "AUTHORIZE CHANGE?",
      text: `Granting ${newRole.toUpperCase()} permissions to ${user.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, AUTHORIZE",
      background: "#fff",
      color: "#000",
      backdrop: `rgba(0,0,0,0.5) backdrop-blur-sm`,
      customClass: {
        popup: 'rounded-none border-t-8 border-black',
        title: 'font-black italic uppercase tracking-tighter',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole }).then((res) => {
          if (res.data.modifiedCount > 0) {
            queryClient.invalidateQueries(["access-users"]);
            Swal.fire({
              title: "PROTOCOL UPDATED",
              text: "Permissions synchronized successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
              background: "#000",
              color: "#fff"
            });
          }
        });
      }
    });
  };

  // Search Filter
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic">Security / Permissions Vault</p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
             ACCESS <br /> CONTROL.
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
           <div className="relative group sm:w-80 shadow-sm transition-all focus-within:shadow-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH CITIZEN IDENTITY..." 
              className="w-full bg-white border-none py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- ACCESS TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Citizen Profile</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Current Authorization</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Security Actions</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Terminal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="group/row hover:bg-gray-50/80 transition-all duration-300">
                  
                  {/* Profile Info */}
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-100">
                          <User size={18} className="text-gray-400" />
                       </div>
                       <div>
                          <p className="text-[11px] font-black uppercase italic tracking-tighter text-gray-900 leading-none">{user.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{user.email}</p>
                       </div>
                    </div>
                  </td>

                  {/* Current Role Badge */}
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border ${
                      user.role === 'admin' ? 'bg-black text-white border-black shadow-lg' : 'bg-gray-50 text-gray-400 border-gray-200'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck size={12} className="text-blue-500" /> : <Lock size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest italic">{user.role || 'Citizen'}</span>
                    </div>
                  </td>

                  {/* Security Actions (Role Switcher) */}
                  <td className="p-8">
                     <div className="flex items-center gap-4">
                        {user.role === 'admin' ? (
                          <button 
                            onClick={() => handleRoleToggle(user, 'user')}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline underline-offset-4 flex items-center gap-2"
                          >
                             <Unlock size={14} /> Revoke Master
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleRoleToggle(user, 'admin')}
                            className="text-[10px] font-black uppercase tracking-widest text-blue-700 hover:underline underline-offset-4 flex items-center gap-2"
                          >
                             <ShieldCheck size={14} /> Promote to Master
                          </button>
                        )}
                     </div>
                  </td>

                  {/* Status Indicator */}
                  <td className="p-8 text-right">
                     <div className="flex justify-end items-center gap-3">
                        <Activity size={14} className={user.role === 'admin' ? "text-blue-500" : "text-gray-200"} />
                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Live Sync</span>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;