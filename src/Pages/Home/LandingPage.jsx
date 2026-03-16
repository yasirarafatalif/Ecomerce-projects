import React, { useState } from "react";
import {
  Menu,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronRight,
  Search,
  MoveRight,
  ChevronLeft,
  Plus,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const LandingPage = () => {
 

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans relative">
      {/* 0. Background Subtle Grainy Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      {/* --- 5. APPROACH SECTIONS --- (image_5.png style) */}
      <section className="relative z-10 px-6 md:px-16 py-24 bg-[#F2F2F2]">
        <div className="max-w-[1000px] mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-5 leading-[0.9]">
            Our Approach To Fashion Design
          </h2>
          <p className="text-gray-600 text-[13px] font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
            at elegant vogue , we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time each
            design is meticulously crafted, ensuring the highest quality
            exquisite finish
          </p>
        </div>
        <div className="relative max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {[
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
          ].map((url, i) => (
            <div
              key={i}
              className={`aspect-[4/5] bg-white border border-gray-100 shadow-xl overflow-hidden ${i === 2 ? "md:-translate-y-8" : ""} ${i === 3 ? "md:-translate-y-16" : ""}`}
            >
              <img
                src={url}
                alt={`approach ${i}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      
      
    </div>
  );
};

export default LandingPage;
