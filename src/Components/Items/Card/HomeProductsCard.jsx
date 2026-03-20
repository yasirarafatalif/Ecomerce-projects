import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeProductsCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div key={product._id} className="group cursor-pointer">
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
              {product.category} <span className="text-gray-200 ml-1">+5</span>
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
    </Link>
  );
};

export default HomeProductsCard;
