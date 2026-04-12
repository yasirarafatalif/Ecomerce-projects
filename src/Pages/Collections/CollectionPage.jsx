import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import PremiumSpinner from "../../Components/Shared/PremiumSpinner";
import ProductsCard from "../../Components/Items/Card/ProductsCard";
const ProductsPage = () => {
  const axiosSecure = useAxios();
  const categories = [
    "NEW",
    "BEST SELLERS",
    "SHIRTS",
    "MEN",
    "WOMEN",
    "T-SHIRTS",
    "POLO SHIRTS",
    "JEANS",
    "SHORTS",
    "JACKETS",
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const filterGroups = [
    "Category",
    "Colors",
    "Price Range",
    "Collections",
    "Tags",
    "Ratings",
  ];
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState("all");

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Collections-page", category, size],
    queryFn: async () => {
      let url = "/products-collections?";
      if (category !== "all") {
        url += `category=${category}&`;
      }

      if (size !== "all") {
        url += `size=${size}`;
      }
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return <PremiumSpinner></PremiumSpinner>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-28 pb-20 px-4 md:px-12 font-sans">
      <title>ZERO FAISHON || PRODUCTS COLLECTIONS PAGE</title>

      {/* Breadcrumb & Title */}
      <div className="mb-8">
        {/* <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Home / <span className="text-gray-900">Products</span></p> */}
        <h1 className="text-3xl font-black uppercase tracking-tighter mt-2 italic">
          PRODUCTS
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* --- FIXED SIDEBAR FILTERS --- */}
        <aside className="w-full lg:w-64 lg:sticky lg:top-24 h-auto lg:max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
          <div className="pr-2">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6">
              Filters
            </h3>

            {/* Size Filter */}
            <div className="mb-8">
              <p className="text-[11px] font-black uppercase mb-3">Size</p>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border border-gray-300 hover:cursor-pointer py-2 text-[10px] font-bold hover:bg-black hover:text-white transition-colors uppercase ${size === s ? "bg-black text-white border-gray-400" : "bg-transparent "}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[11px] font-black uppercase">Availability</p>
                <ChevronDown size={14} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-[11px] font-bold text-gray-600 uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black rounded-none"
                  />
                  Availability{" "}
                  <span className="text-blue-700 ml-auto">({products?.length})</span>
                </label>
                <label className="flex items-center gap-3 text-[11px] font-bold text-gray-600 uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-black rounded-none"
                  />
                  Out Of Stock{" "}
                  <span className="text-blue-700 ml-auto">(18)</span>
                </label>
              </div>
            </div>

            {/* Collapsible Groups */}
            <div className="flex flex-col border-t border-gray-200">
              {filterGroups.map((group) => (
                <div
                  key={group}
                  className="flex justify-between items-center py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100/50 px-1 transition-all"
                >
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    {group}
                  </span>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA (Scrollable) --- */}
        <main className="flex-1 w-full">
          {/* Top Search & Tag Bar */}
          <div className="flex flex-col xl:flex-row gap-4 mb-10  lg:relative lg:top-0 z-20 bg-[#f2f2f2]/90 backdrop-blur-sm py-2">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-200/50 border-none py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-3 hover:cursor-pointer hover:bg-black hover:text-white  text-[9px] font-black uppercase tracking-widest border border-gray-200 transition-all
                  ${category === cat ? "bg-black text-white border-gray-400" : "bg-transparent "}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductsCard product={product}></ProductsCard>
            ))}
          </div>
        </main>
      </div>

      {/* Custom Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProductsPage;
