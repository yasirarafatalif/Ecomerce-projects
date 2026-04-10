import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { CartContext } from "../../Provider/CartContext";

const CartShowBtn = ({ user }) => {
  const axois = useAxios();
  const email = user?.email;
  const {cartData}= useContext(CartContext)
  console.log(cartData)
  return (
    <Link to='/cart'>
      <div className="relative hidden sm:flex">
        <button className="p-2.5 bg-[#1A1A1A] text-white rounded-full hover:bg-black transition-transform active:scale-95">
          <ShoppingCart size={16} className="text-white" />
        </button>

        {cartData.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {cartData.length}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartShowBtn;
