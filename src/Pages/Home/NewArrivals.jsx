import React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BgImg from "../../assets/bg-home1.png"; // Aponar image path
import useAxios from "../../Hooks/useAxios";
import PremiumLoader from "../../Components/Shared/PremiumSpinner";
import NweArrivalsSkeletonCard from "../../Components/Shared/SkeletonCard/NweArrivalsSkeletonCard";
const products = [
  {
    id: 1,
    category: "T-Shirt",
    title: "Basic Cotton Black T-Shirt",
    price: "$120",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    category: "T-Shirt",
    title: "Oversized Street Style T-Shirt",
    price: "$150",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    category: "T-Shirt",
    title: "Minimal White Cotton T-Shirt",
    price: "$110",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    category: "T-Shirt",
    title: "Premium Heavyweight T-Shirt",
    price: "$170",
    img: "https://images.unsplash.com/photo-1618354691321-e851c56960d1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    category: "T-Shirt",
    title: "Graphic Print Casual T-Shirt",
    price: "$160",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    category: "T-Shirt",
    title: "Classic Round Neck T-Shirt",
    price: "$130",
    img: "https://images.unsplash.com/photo-1593032465171-8f0b77c6f5fa?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    category: "Hoodie",
    title: "Essential Grey Hoodie",
    price: "$210",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    category: "Hoodie",
    title: "Midnight Blue Pullover",
    price: "$230",
    img: "https://images.unsplash.com/photo-1513258496099-48168024adb0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    category: "Jacket",
    title: "Classic Denim Trucker Jacket",
    price: "$350",
    img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    category: "Jacket",
    title: "Leather Biker Jacket",
    price: "$450",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    category: "Accessories",
    title: "Canvas Everyday Backpack",
    price: "$180",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    category: "Accessories",
    title: "Minimalist Leather Watch",
    price: "$280",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
  },
];
const NewArrivals = () => {
  const { data, loading, error } = useAxios("/new-arrivals");
  if (loading) {
    return (
      <section
        className="relative min-h-screen w-full bg-[#f2f2f2] px-6 md:px-16 py-16 overflow-hidden"
        style={{
          backgroundImage: `url(${BgImg})`,
          opacity: 0.9,
        }}
      >
        <div className="relative z-10">
          {/* Header Section Skeleton */}
          <div className="flex justify-between items-end mb-10">
            <div className="h-12 w-64 bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
          </div>

          {/* Grid of Skeleton Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <NweArrivalsSkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-[#f2f2f2] px-6 md:px-16 py-16 overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${BgImg})`,
          opacity: 0.7,
        }}
      />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter">
            NEW <br /> THIS WEEK
            <span className="text-blue-700 text-lg md:text-xl font-bold align-top ml-2">
              (50)
            </span>
          </h2>
          <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            See All
          </button>
        </div>

        {/* Product Slider Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 md:gap-6 overflow-x-auto no-scrollbar pb-10">
          {data?.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div
                className={`relative aspect-[3/4] bg-white overflow-hidden shadow-sm transition-all duration-500 ${product.featured ? "ring-2 ring-blue-600 ring-offset-4" : ""}`}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5 backdrop-blur-[2px]">
                  <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Plus size={20} className="text-black" />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-5 flex justify-between items-start px-1">
                <div className="max-w-[80%]">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">
                    {product.category}{" "}
                    <span className="text-gray-200 ml-1">+5</span>
                  </p>
                  <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-tighter leading-tight group-hover:underline">
                    {product.title}
                  </h3>
                </div>
                <span className="font-black text-[13px] text-gray-900">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center gap-3 mt-4">
          <button className="p-3 border border-gray-300 hover:bg-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-3 border border-gray-300 hover:bg-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Custom CSS for hidden scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default NewArrivals;
