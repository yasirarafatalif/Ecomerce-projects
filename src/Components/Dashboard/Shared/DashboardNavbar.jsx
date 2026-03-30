import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, User } from "lucide-react";
import UserMenu from "../../Items/User/UserMenu";
import useAuth from "../../../Hooks/useAuth";

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const {user}= useAuth();
  return (
    <header className="h-20 w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-10 shrink-0 z-50 fixed top-0 left-0">
      {/* Brand & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 bg-black text-white active:scale-90 transition-all">
          {isOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
        <Link to="/" className="group">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
            XIV <span className="text-blue-700">CONTROL.</span>
          </h2>
        </Link>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-black transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-700 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <UserMenu user={user}></UserMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;