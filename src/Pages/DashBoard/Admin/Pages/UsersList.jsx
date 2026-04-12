import React from "react";
import { User, Mail, Shield, Trash2, ShieldCheck, Search, Filter, ArrowUpRight } from "lucide-react";
import { useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../../Hooks/useAxios";
import useRole from "../../../../Hooks/useRole";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";

const UsersList = () => {
  const axiosSecure = useAxios();
  const { role } = useRole();
//   const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", role],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?userRole=${role}`);
      return res.data.result;
    },
  });

  // Role Update Logic
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        // queryClient.invalidateQueries(["users"]); // UI refresh korbe
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} identifies as Master Admin.`,
          showConfirmButton: false,
          timer: 1500,
          background: "#000",
          color: "#fff"
        });
      }
    });
  };

  // Delete Logic
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "EXTRACT CITIZEN?",
      text: "This will permanently revoke all access rights.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, REVOKE",
      background: "#fff",
      color: "#000"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // queryClient.invalidateQueries(["users"]);
            Swal.fire("EXTRACTED!", "Citizen has been removed from the collective.", "success");
          }
        });
      }
    });
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-8">
        <title>ZERO FAISHON || USERS LIST PAGE</title>
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2">
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
             USERS LIST.
          </h1>
          <div className="flex items-center gap-4 mt-4">
             <div className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                {users.length} Active Records
             </div>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                Authorized access only
             </p>
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative group sm:w-80 shadow-sm transition-all focus-within:shadow-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH BY IDENTITY..." 
              className="w-full bg-white border-none py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
            />
          </div>
          <button className="bg-white border border-gray-200 text-black px-8 py-4 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95">
             <Filter size={14} />
             <span className="text-[10px] font-black uppercase tracking-widest">Filter Status</span>
          </button>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Identification</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Communication Hub</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Permission Role</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Terminal Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 ">
              {users.map((user) => (
                <tr key={user._id} className="group/row hover:bg-gray-50/80 transition-all duration-300">
                  {/* Name & Avatar */}
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-dashed border-gray-200 group-hover/row:border-black group-hover/row:scale-110 transition-all duration-500">
                        <User size={20} className="text-gray-300 group-hover/row:text-black transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase italic tracking-tighter text-gray-900 group-hover/row:text-blue-700 transition-colors">
                          {user.name}
                        </h4>
                        <p className="text-[9px] font-bold text-gray-300 uppercase mt-1 tracking-widest">
                          UID: {user._id.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-8">
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      <Mail size={14} className="text-gray-300" />
                      <span className="group-hover/row:text-black transition-colors">{user.email}</span>
                    </div>
                  </td>

                  {/* Role Status */}
                  <td className="p-8">
                    {user.role === "admin" ? (
                      <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 shadow-lg">
                        <ShieldCheck size={14} className="text-blue-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">Master Admin</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleMakeAdmin(user)}
                        className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-200 text-gray-400 hover:border-black hover:text-black transition-all group/btn"
                      >
                        <Shield size={14} className="group-hover/btn:rotate-12 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Identify as Admin</span>
                      </button>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="p-8 text-right">
                    <div className="flex justify-end gap-3 translate-x-4   group-hover/row:translate-x-0 group-hover/row:opacity-100 transition-all duration-500">
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-3 bg-white text-gray-400 border border-gray-100 hover:cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-3 bg-white text-gray-400 border border-gray-100 hover:cursor-pointer hover:bg-black hover:text-white transition-all shadow-sm">
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {users.length === 0 && (
        <div className="py-32 text-center bg-white border-2 border-dashed border-gray-100">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-200">Vault Access Null.</h3>
           <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">No active citizen records found in the collective.</p>
        </div>
      )}
    </div>
  );
};

export default UsersList;