import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  Package,
  Heart,
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  Users,
  PackageCheck,
  Boxes,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import { FiRotateCcw } from "react-icons/fi";
import { LogToast } from "../../Shared/LogToast";

const UserMenu = ({ user }) => {
  const axois = useAxios();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    try {
      await axois.post("/logout", {}, { withCredentials: true });

      LogToast("Logout Successful", "INACTIVE");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
      });
    }
  };

  return (
    <div className="relative hover:cursor-pointer" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-full transition-all active:scale-95 ${
          isOpen
            ? "bg-black text-white"
            : "bg-[#1A1A1A] text-white hover:bg-black"
        }`}
      >
        <User className="hover:cursor-pointer" size={16} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 py-4 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Section */}
          <div className="px-5 pb-4 border-b border-gray-100 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-black text-xs italic">
                <img src={user?.image || "user"} alt="User" srcset="" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-black uppercase tracking-tighter">
                  {user?.name}
                </span>
                <span className="text-[10px] font-bold text-gray-400 lowercase">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col">
            {/* USER MENU */}
            {role === "user" && (
              <>
                <DropdownLink
                  icon={<Package size={14} />}
                  label="My Orders"
                  to="/my-orders"
                />
                <DropdownLink
                  icon={<Heart size={14} />}
                  label="Wishlist"
                  to="/wishlist"
                />
                <DropdownLink
                  icon={<Settings size={14} />}
                  label="Account Settings"
                  to="/account-settings"
                />
                <DropdownLink
                  icon={<FiRotateCcw size={14} />}
                  label="Returns Orders"
                  to="/returns-orders"
                />
              </>
            )}

            {/* ADMIN MENU */}
            {role === "admin" && (
              <>
                <DropdownLink
                  icon={<LayoutDashboard size={14} />}
                  label="Dashboard"
                  to="/dashboard"
                />
                {/* <DropdownLink
                  icon={<ShoppingBag size={14} />}
                  label="Manage Orders"
                  to="/dashboard/manage-orders"
                /> */}

                <DropdownLink
                  icon={<Settings size={14} />}
                  label="Admin Settings"
                  to="/dashboard/admin-settings"
                />
              </>
            )}

            {/* STAFF MENU */}
            {role === "staff" && (
              <>
                <DropdownLink
                  icon={<LayoutDashboard size={14} />}
                  label="Staff Dashboard"
                  to="/dashboard"
                />
                <DropdownLink
                  icon={<PackageCheck size={14} />}
                  label="Process Orders"
                  to="/dashboard/process-orders"
                />
                <DropdownLink
                  icon={<Boxes size={14} />}
                  label="Manage Products"
                  to="/dashboard/manage-products"
                />
                <DropdownLink
                  icon={<Settings size={14} />}
                  label="Staff Settings"
                  to="/dashboard/staff-settings"
                />
              </>
            )}

            <hr className="my-2 border-gray-50" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-2.5 text-red-500 hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut size={14} />
              <span className="text-[11px] font-black uppercase tracking-widest">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for individual links
const DropdownLink = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors group"
  >
    <div className="flex items-center gap-3 text-gray-700 group-hover:text-black">
      {icon}
      <span className="text-[11px] font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <ChevronRight
      size={12}
      className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all"
    />
  </Link>
);

export default UserMenu;
