import React, { use, useContext, useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import QuantityBox from "../../Components/Items/Cart/QuantityBox";
import { ShowProtocolUpdatedAlert } from "../../Components/Shared/ShowProtocolUpdatedAlert";
import { ShowProtocolErrorAlert } from "../../Components/Shared/ShowProtocolErrorAlert";
import { CartContext } from "../../Provider/CartContext";
import useCart from "../../Hooks/useCart";
import PremiumSpinner from "../../Components/Shared/PremiumSpinner";

const CartPage = () => {
  const { user } = useAuth();
  const axois = useAxios();
  const email = user?.email;
  const queryClient = useQueryClient();
  const {cartData : cartItems = [], cartLoading} = useCart();
  

  // const { data: cartItems = [], refetch } = useQuery({
  //   queryKey: ["cart-page", email],
  //   enabled: !!email,
  //   queryFn: async () => {
  //     const res = await axois.get(`/cartpage?email=${email}`);
  //     return res.data;
  //   },
  // });
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.totalQuantity,
    0,
  );
  const shipping = 15.0;

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axois.delete(`/cartpage?id=${id}`);
          queryClient.invalidateQueries(["cart-data", user?.email]);

          if (res.data.data.deletedCount > 0) {
           ShowProtocolUpdatedAlert("Item removed from cart successfully", "success");
            refetch();
          }
        } catch (error) {
          ShowProtocolErrorAlert(`Error: ${error}`, "error");
        }
      }
    });
  };

  const handleQuantity = async (id, type, currentQty) => {
    const newQty =
      type === "inc" ? currentQty + 1 : Math.max(1, currentQty - 1);

    try {
      await axois.patch(`/cart/${id}`, {
        quantity: newQty,
      });

      refetch();
    } catch (error) {
      ShowProtocolErrorAlert(`Error: ${error}`, "error");
    }
  };
  if (cartLoading) return <PremiumSpinner></PremiumSpinner>

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-32 pb-20 font-sans">
      <title>Cart-Checkout</title>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-700 italic mb-2">
            XIV Collective / Inventory
          </p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
            YOUR SELECTIONS.
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* --- LEFT: CART ITEMS LIST --- */}
          <div className="w-full lg:flex-1 space-y-8">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group hover:cursor-pointer relative bg-white/50 backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-transparent hover:shadow-2xl transition-all shadow-sm"
                >
                  {/* Image Container */}
                  <div className="w-full md:w-40 aspect-[3/4] bg-white overflow-hidden shadow-lg">
                    <img
                      src={item.img}
                      alt={item.productName}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  {/* Details Container */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                          {item.productCategory} / {item.productType}
                        </p>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900 leading-tight">
                          {item.productName}
                        </h3>
                        <div className="flex gap-6 mt-4 text-[11px] font-black uppercase tracking-widest text-gray-500">
                          <p>
                            Size:{" "}
                            <span className="text-black italic">
                              {item.size}
                            </span>
                          </p>
                          <p>
                            Price:{" "}
                            <span className="text-black italic">
                              ${item.productPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handelDelete(item?._id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-8 gap-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 bg-white">
                        <button
                          disabled={item.totalQuantity === 1}
                          onClick={() =>
                            handleQuantity(item._id, "dec", item.totalQuantity)
                          }
                          className="p-3 hover:bg-black hover:text-white transition-colors disabled:opacity-20"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-6 font-black text-sm">
                          {item.totalQuantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(item._id, "inc", item.totalQuantity)
                          }
                          className="p-3 hover:bg-black hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Status Badges */}
                      <div className="flex gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-400 border border-gray-200">
                          Payment: {item.paymentStatus}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 italic">
                          Logistics: {item.deliveryStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* --- EMPTY CART STATE --- */
              <div className="flex flex-col items-center justify-center py-24 px-6 bg-white/30 backdrop-blur-sm border-2 border-dashed border-gray-200">
                <div className="relative mb-8">
                  <ShoppingBag size={100} className="text-gray-100" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Empty
                    </span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-gray-900 text-center leading-none">
                  YOUR BAG IS <br /> VACANT.
                </h2>

                <p className="mt-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 text-center max-w-sm leading-relaxed">
                  It seems you haven't selected any pieces for your collection
                  yet.
                </p>

                <Link to="/collections" className="mt-10">
                  <button className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all flex items-center gap-4 group shadow-2xl">
                    Browse Collections
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* --- RIGHT: SUMMARY CARD --- */}
          <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
            <div className="bg-white p-10 shadow-2xl border-t-8 border-black">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-8 underline decoration-blue-700 decoration-4 underline-offset-8">
                Summary.
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                  <span>Standard Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400 italic">
                  <span>Tax (Estimated)</span>
                  <span>$0.00</span>
                </div>

                <hr className="border-gray-100 mt-6" />

                <div className="flex justify-between text-2xl font-black uppercase italic tracking-tighter text-gray-900 pt-4">
                  <span>Total Due</span>
                  <span>${(subtotal + shipping).toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="block mt-10">
                <button className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl group">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">
                    Initialize Checkout
                  </span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </Link>

              {/* Guarantees */}
              <div className="mt-10 space-y-4 border-t border-gray-50 pt-8">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <ShieldCheck size={16} className="text-blue-700" />
                  <span>Secure Member Encryption</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <Truck size={16} className="text-blue-700" />
                  <span>XIV Express Global Delivery</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-gray-300">
              Prices include all applicable member duties.
            </p>
          </div>
        </div>
      </div>

      {/* Background Texture Overlay */}
      <div className="fixed inset-0 z-[-1] opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
    </div>
  );
};

export default CartPage;
