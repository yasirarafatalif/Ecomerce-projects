import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import Img from "../../assets/bg-home1.png"; // Aponar image path

const Collections = () => {
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
    <section
      className="min-h-screen bg-[#f2f2f2] px-6 md:px-16 py-20 font-sans relative"
      style={{
        backgroundImage: `url(${Img})`,
        opacity: 0.8, // Ekhane opacity komano hoyeche (0.1 theke 1 er moddhe thakbe)
      }}
    >
      {/* Background Texture Overlay (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter uppercase text-gray-900">
            XIV <br /> COLLECTIONS <br /> 25-26
          </h1>

          <div className="mt-8 flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
            <button className="text-black border-b-2 border-black pb-1">
              (ALL)
            </button>
            <button className="hover:text-black transition-colors">Men</button>
            <button className="hover:text-black transition-colors">
              Women
            </button>
            <button className="hover:text-black transition-colors">KID</button>
          </div>
        </div>

        <div className="flex gap-12 mt-8 md:mt-0 text-[13px] font-bold uppercase tracking-wider">
          <button className="flex items-center gap-1">Filters(+)</button>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1">Sorts(-)</p>
            <span className="text-gray-400 block mt-1 lowercase font-normal">
              Less to more <br /> More to Less
            </span>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mb-12" />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            {/* Image Container */}
            <div
              className={`relative aspect-[7/4] bg-white overflow-hidden transition-all duration-300 `}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />

              {/* Plus Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <div className="bg-white/80 p-2 rounded-full">
                  <Plus size={20} className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-4 flex justify-between items-start">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                  {product.category}{" "}
                  <span className="text-gray-300 ml-1">+5</span>
                </p>
                <h3 className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-tighter">
                  {product.title}
                </h3>
              </div>
              <span className="font-bold text-sm">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer "More" Button */}
      <div className="flex flex-col items-center mt-20 group cursor-pointer">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">
          More
        </span>
        <ChevronDown
          size={24}
          className="text-gray-400 group-hover:text-black group-hover:translate-y-1 transition-all"
        />
      </div>
    </section>
  );
};

export default Collections;
