import React from "react";
import { Search, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router";
const ProductsPage = () => {
  const categories = [
    "NEW",
    "BEST SELLERS",
    "SHIRTS",
    "T-SHIRTS",
    "POLO SHIRTS",
    "JEANS",
    "SHORTS",
    "JACKETS",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  const filterGroups = [
    "Category",
    "Colors",
    "Price Range",
    "Collections",
    "Tags",
    "Ratings",
  ];

  const products = [
    {
      id: 1,
      category: "Cotton T-Shirt",
      title: "Basic Heavy Weight T-Shirt",
      price: "$199",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      category: "Denim Jeans",
      title: "Soft Wash Straight Fit Jeans",
      price: "$249",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
      featured: true,
    },
    {
      id: 3,
      category: "Oversized T-Shirt",
      title: "Street Style Graphic Tee",
      price: "$179",
      img: "https://www.instyle.com/thmb/Fg9bRyG208DgYr8A8tYebRXZthk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Screenshot2024-04-14at12.08.25PM-6a9acafef1ef491580eafa2de9d20994.png",
    },
    {
      id: 4,
      category: "Hoodie",
      title: "Premium Cotton Hoodie",
      price: "$299",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      category: "Sneakers",
      title: "Urban Casual Sneakers",
      price: "$320",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      category: "Jacket",
      title: "Winter Casual Jacket",
      price: "$399",
      img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 7,
      category: "Cap",
      title: "Minimal Cotton Cap",
      price: "$79",
      img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      category: "Shirt",
      title: "Classic White Formal Shirt",
      price: "$210",
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-28 pb-20 px-4 md:px-12 font-sans">
      <title>Products Collections Page</title>

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
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 py-2 text-[10px] font-bold hover:bg-black hover:text-white transition-colors uppercase"
                  >
                    {size}
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
                  <span className="text-blue-700 ml-auto">(450)</span>
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
          <div className="flex flex-col xl:flex-row gap-4 mb-10 sticky top-[100px] lg:relative lg:top-0 z-20 bg-[#f2f2f2]/90 backdrop-blur-sm py-2">
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
                  className={`px-5 py-3 text-[9px] font-black uppercase tracking-widest border border-gray-200 transition-all
                  ${index === 0 ? "bg-white border-gray-400" : "bg-transparent hover:bg-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group cursor-pointer"
              >
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] bg-white overflow-hidden border border-transparent group-hover:border-gray-300 transition-all shadow-sm">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 p-2 shadow-xl border border-gray-100">
                        <Plus size={22} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-1 px-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {product.category}
                    </p>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[13px] font-black uppercase tracking-tighter text-gray-800">
                        {product.title}
                      </h3>
                      <span className="text-[13px] font-black text-gray-900">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
