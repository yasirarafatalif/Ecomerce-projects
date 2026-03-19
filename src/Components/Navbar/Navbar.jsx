import React, { useState } from "react";
import { Menu, Heart, ShoppingBag, User, X, ChevronRight } from "lucide-react";
import Logo from "../Shared/Logo";
import { Link } from "react-router";
import UserMenu from "../Items/User/UserMenu";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = ["Home", "Collections", "New", "Offers", "About" ,"Login","Register","Profile"];
  const user = {
    name: "Yasir Arafat",
    email: "email.com",
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-transparent backdrop-blur-[2px] transition-all duration-300">
        {/* --- Left Section: Drawer Toggle & Desktop Links --- */}
        <div className="flex items-center gap-4 md:gap-8">
          <button
            className="p-1 hover:bg-black/5 rounded-md transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} className="text-gray-900" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-tight text-gray-700">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                // href="#"
                className="hover:text-black transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* --- Center Section: Brand Logo --- */}
        <Logo></Logo>

        {/* --- Right Section: Icons & Cart --- */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden sm:flex p-2.5 bg-[#1A1A1A] text-white rounded-full hover:bg-black transition-transform active:scale-95">
            <Heart size={16} />
          </button>

          <div className="flex items-center bg-[#1A1A1A] rounded-full p-1 pl-3 md:pl-5 pr-1 gap-2 md:gap-4 cursor-pointer hover:bg-black transition-all active:scale-95">
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hidden xs:block">
              Cart
            </span>
            <div className="bg-white p-1.5 rounded-full shadow-sm">
              <ShoppingBag size={14} className="text-black" />
            </div>
          </div>
          {user ? (
            
            <UserMenu />
          ) : (
          
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 rounded-full shadow-lg">
              <User size={14} />
              Log In
            </button>
          )}
          {/* <UserMenu ></UserMenu> */}
        </div>
      </nav>

      {/* --- SIDE DRAWER OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="font-bold text-xl tracking-tighter italic text-gray-900">
              MENU
            </span>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="group flex items-center justify-between text-lg font-medium text-gray-800 hover:text-black transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {link}
                <ChevronRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="#" className="hover:underline hover:text-black">
                Privacy
              </a>
              <a href="#" className="hover:underline hover:text-black">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
