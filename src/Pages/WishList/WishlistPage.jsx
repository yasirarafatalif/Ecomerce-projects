import React, { useState } from "react";
import {
  ShoppingBag,
  X,
  Heart,
  ArrowRight,
  LayoutGrid,
  Square,
  Trash2,
  Filter,
} from "lucide-react";
import Img from "../../assets/bg-home1.png";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const WishlistPage = () => {
  const [cols, setCols] = useState(4);

  const { user } = useAuth();
  const axois = useAxios();
  const email = user?.email;

  const { data: wishlistItems = [], refetch } = useQuery({
    queryKey: ["wishlist-show", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axois.get(`/wishlist-data?email=${email}`);
      return res.data;
    },
  });
  const handelDeleteWishlist = async (id = null, isAll = false) => {
    try {
      const url = isAll
        ? `/wishlist-data?email=${email}&all=true`
        : `/wishlist-data?id=${id}&email=${email}`;

      const res = await axois.delete(url);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: isAll
            ? "All wishlist items removed"
            : res.data.message || "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to remove item",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-32 pb-20 font-sans overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${Img})`, opacity: 0.5 }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-16">
        {/* --- 1. TOP HEADER & CONTROLS --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-gray-200 pb-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic text-gray-900">
              SAVED PRODUCTS.
            </h1>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.4em] text-blue-700 italic">
              Carefully curated by you / {wishlistItems.length} Items
            </p>
          </div>

          <div className="flex items-center gap-10">
            {/* Grid Switcher (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-4 border-r border-gray-300 pr-10">
              <button
                onClick={() => setCols(2)}
                className={`transition-all ${cols === 2 ? "text-black" : "text-gray-300"}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setCols(4)}
                className={`transition-all ${cols === 4 ? "text-black" : "text-gray-300"}`}
              >
                <Square size={20} className="rotate-45" />
              </button>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
              <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group underline-offset-8 underline decoration-gray-300">
                Move All to Bag{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
              onClick={() => handelDeleteWishlist(null, true)}
               className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                <Trash2 size={12} /> Clear List
              </button>
            </div>
          </div>
        </div>

        {/* --- 2. WISHLIST DYNAMIC GRID --- */}
        <div
          className={`grid gap-x-8 gap-y-16 transition-all duration-500 ${
            cols === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {wishlistItems.map((item) => (
            <div key={item.id} className="group flex flex-col">
              {/* Product Card Container */}
              <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
                {/* Remove Trigger */}
                <button
                  onClick={() => handelDeleteWishlist(item._id)}
                  className="absolute top-4 right-4 z-30 p-2.5 bg-white/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white"
                >
                  <X size={16} />
                </button>

                <img
                  src={item.productImg}
                  alt={item.productTitle}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
              </div>

              {/* Information & Details */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    {item?.productCategory}
                  </p>
                  <span className="text-sm font-black text-gray-900">
                    {item?.productPrice}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tighter italic text-gray-800 leading-none group-hover:underline">
                  {item?.productTitle}
                </h3>
                <div className="mt-4 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase ml-2">
                    + More Colors
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. EMPTY STATE HELP --- */}
        <div className="mt-40 pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-10 items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Share My List
              </span>
              <div className="flex gap-4 mt-2">
                <button className="text-xs font-bold uppercase underline">
                  Copy Link
                </button>
                <button className="text-xs font-bold uppercase underline">
                  Email
                </button>
              </div>
            </div>
          </div>

          <button className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-2xl active:scale-95">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
