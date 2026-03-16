import React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BgImg from "../../assets/bg-home1.png"; // Aponar image path

const NewArrivals = () => {
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
img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
featured: true,
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
    featured: true,
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
    img: "https://images.unsplash.com/photo-1576871333021-0268560032cc?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    category: "Jacket",
    title: "Leather Biker Jacket",
    price: "$450",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    featured: true,
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
  {
    id: 13,
    category: "T-Shirt",
    title: "Summer V-Neck White",
    price: "$95",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 14,
    category: "Hoodie",
    title: "Streetwear Oversized Hoodie",
    price: "$260",
    img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80",
  }
];


  return (
    <section className="relative min-h-screen w-full bg-[#f2f2f2] px-6 md:px-16 py-16 overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${BgImg})`,
          opacity: 0.6, // Halka grainy look-er jonno
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
