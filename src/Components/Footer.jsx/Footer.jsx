import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Img from "../../assets/bg-home1.png";
import Logo from "../Shared/Logo";

const Footer = () => {
  return (
    <footer
      className="bg-[#f2f2f2] px-6 md:px-16 py-16 border-t border-gray-200 font-sans relative"
      style={{
        backgroundImage: `url(${Img})`,
        opacity: 0.8,
      }}
    >
      {/* Background Subtle Grainy Effect */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Top Section: Newsletter & Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              JOIN OUR <br />{" "}
              <span className="text-blue-700">ZERO FAISHON</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mb-8 font-medium">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="relative max-w-md group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b-2 border-gray-300 py-3 focus:outline-none focus:border-black transition-colors text-sm font-bold tracking-widest uppercase"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:items-end justify-center">
            {/* Brand Logo */}
            <div className="flex items-center justify-center h-12 w-12 mb-4">
              <div className="w-1/2 h-full bg-gray-300 transform skew-x-[-20deg]"></div>
              <div className="w-1/2 h-full bg-black transform skew-x-[-20deg]"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">ZERO FAISHON</h3>

            <p className="text-right text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              © 2026 XIV COLLECTIONS. <br /> ALL RIGHTS RESERVED.
            </p>
          </div>
          
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900">
              Shop
            </h4>
            <div className="flex flex-col gap-2 text-[13px] font-medium text-gray-500">
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Men's Collection
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Women's Collection
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Kid's Wear
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                New Arrivals
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900">
              Information
            </h4>
            <div className="flex flex-col gap-2 text-[13px] font-medium text-gray-500">
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Our Story
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Sustainability
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Store Locator
              </a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900">
              Help
            </h4>
            <div className="flex flex-col gap-2 text-[13px] font-medium text-gray-500">
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Shipping & Returns
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                FAQs
              </a>
            </div>
          </div>

          {/* Column 4: Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-[12px] font-bold text-gray-800 italic">
              <span className="flex items-center gap-2 underline tracking-tighter">
                <Mail size={14} /> yasirarafatalif1.com
              </span>
              <span className="flex items-center gap-2 underline tracking-tighter">
                <Phone size={14} /> +880 1851973300
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            Dhaka, Bangladesh — Worldwide Shipping
          </p>
          <div className="flex gap-6 opacity-30 grayscale items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              className="h-4"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-3"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
