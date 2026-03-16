import React, { useState } from 'react';
import { Heart, ShoppingBag, Plus, Minus, Star, ChevronDown, Share2 } from 'lucide-react';

const ProductDetails = () => {
  // Product Images Array
  const productImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
    
  ];

  // States
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-28 pb-20 font-sans">
      <title>Product Details</title>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* --- LEFT: IMAGE SECTION --- */}
          <div className="w-full lg:flex-1 flex flex-col md:flex-row gap-4">
            
            {/* Thumbnails (Selected korte dibe) */}
            <div className="order-2 md:order-1 flex md:flex-col gap-3">
              {productImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-20 md:w-20 md:h-28 cursor-pointer overflow-hidden border-2 transition-all 
                    ${mainImage === img ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="order-1 md:order-2 flex-1 bg-white aspect-[3/4] overflow-hidden shadow-sm relative group">
              <img 
                src={mainImage} 
                alt="Main Product" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md">
                <Heart size={20} className="text-gray-900" />
              </button>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="w-full lg:w-[450px] lg:sticky lg:top-28">
            <div className="flex flex-col gap-6">
              
              {/* Heading */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1 italic">XIV Exclusive</p>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic text-gray-900 leading-tight">
                  Embroidered <br /> Seersucker Shirt
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-2xl font-black text-gray-900">$199.00</span>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">4.8 (120)</span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest mb-4">Select Size</p>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-[11px] font-bold border transition-all
                        ${selectedSize === size ? "bg-black text-white border-black shadow-lg" : "bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart & Quantity */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center border border-gray-300 w-fit">
                   <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-3 hover:bg-gray-200 transition-colors"><Minus size={14}/></button>
                   <span className="px-6 font-black text-sm">{quantity}</span>
                   <button onClick={() => setQuantity(quantity+1)} className="p-3 hover:bg-gray-200 transition-colors"><Plus size={14}/></button>
                </div>

                <button className="w-full bg-[#1A1A1A] text-white py-5 flex items-center justify-center gap-4 hover:bg-black transition-all group active:scale-[0.98] shadow-xl">
                  <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-[0.25em]">Add to Bag</span>
                </button>
              </div>

              {/* Details Toggles */}
              <div className="border-t border-gray-200 pt-2">
                {["Description", "Care Instructions", "Sustainability"].map(item => (
                  <div key={item} className="flex justify-between items-center py-4 border-b border-gray-200 cursor-pointer hover:px-2 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-700">{item}</span>
                    <ChevronDown size={16} />
                  </div>
                ))}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <Share2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Share this product</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;