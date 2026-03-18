import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductsCard = ({product}) => {
    return (
        <div>
            <Link
                key={product.id}
                to={`/products/${product._id}`}
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
            
        </div>
    );
};

export default ProductsCard;