import React, { useContext, useState } from "react";
import {
  CreditCard,
  Truck,
  ChevronLeft,
  Lock,
  Info,
  Trash,
} from "lucide-react";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import PremiumSpinner from "../../Components/Shared/PremiumSpinner";
import { CartContext } from "../../Provider/CartContext";
import { ShowProtocolUpdatedAlert } from "../../Components/Shared/ShowProtocolUpdatedAlert";
import { ShowProtocolErrorAlert } from "../../Components/Shared/ShowProtocolErrorAlert";

const CheckoutPage = () => {
  const { user } = useAuth();
  const axois = useAxios();
  const {cartData:cartItems = [],}= useContext(CartContext)
  const userEmail = user?.email;
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  // const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // const {
  //   data: cartItems = [],
  //   refetch,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["cart-page", userEmail],
  //   enabled: !!userEmail,
  //   queryFn: async () => {
  //     const res = await axois.get(`/cartpage?email=${userEmail}`);
  //     return res.data;
  //   },
  // });
  // console.log(cartItems);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.totalQuantity,
    0,
  );

  const handelsubmit = async (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const address = e.target.address.value;
    const orderEmail = e.target.email.value;
    const postalcode = e.target.postal_code.value;
    const city = e.target.city.value;
    const name = first_name + " " + last_name;
    const odersData = {
      name,
      address,
      userEmail,
      orderEmail,
      postalcode,
      city,
      products: cartItems,
      totalAmount: subtotal + 15,
      paymentMethod,
    };
    

    if (paymentMethod === "card") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "this is a demo website, so card payment is not available",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const res = await axois.post("/orders", odersData);

    if (res.data.success) {
      return ShowProtocolUpdatedAlert("Your order has been placed successfully", "success");
      
    } else {
      return ShowProtocolErrorAlert("Failed to place order. Please try again.", "error");
    }

    
    
  };

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

          if (res.data.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Item removed from cart.",
              icon: "success",
            });

            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `${error}`,
            icon: "error",
          });
        }
      }
    });
  };

  // if (isLoading) return <PremiumSpinner />;

  return (
    <div className="min-h-screen bg-[#f2f2f2] pt-28 pb-20 font-sans">
      <title>Checkout</title>
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        {/* Back to Bag */}
        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors">
          <ChevronLeft size={14} />
          Back to Bag
        </button>

        <form
          onSubmit={handelsubmit}
          className="flex flex-col lg:flex-row gap-16 items-start"
        >
          {/* --- LEFT: SHIPPING & PAYMENT (Forms) --- */}
          <div className="flex-1 w-full flex flex-col gap-12">
            {/* 1. Shipping Address */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black italic">
                  01
                </span>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  name="first_name"
                  placeholder="FIRST NAME"
                  className="bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  required
                  name="last_name"
                  placeholder="LAST NAME"
                  className="bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  required
                  name="address"
                  placeholder="ADDRESS"
                  className="md:col-span-2 bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="CITY"
                  name="city"
                  className="bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  required
                  name="postal_code"
                  placeholder="POSTAL CODE"
                  className="bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  name="email"
                  className="md:col-span-2 bg-white border-none py-4 px-5 text-[11px] font-bold tracking-widest uppercase focus:ring-1 focus:ring-black outline-none"
                />
              </div>
            </section>

            {/* 2. Payment Method */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black italic">
                  02
                </span>
                <h2 className="text-xl font-black uppercase tracking-tighter italic">
                  Payment Method
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* Credit Card Option */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-5 bg-white flex items-center justify-between cursor-pointer border transition-all ${paymentMethod === "card" ? "border-black" : "border-transparent"}`}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard size={20} />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Credit / Debit Card
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-black" : "border-gray-300"}`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 bg-white flex items-center justify-between cursor-pointer border transition-all ${paymentMethod === "cod" ? "border-black" : "border-transparent"}`}
                >
                  <div className="flex items-center gap-4">
                    <Truck size={20} />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Cash on Delivery
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-black" : "border-gray-300"}`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </div>
                </div>
              </div>

              {/* Card Form (Only if card is selected) */}
              {paymentMethod === "card" && (
                <div className="mt-4 p-6 bg-white flex flex-col gap-4 animate-in fade-in duration-500">
                  <input
                    type="text"
                    placeholder="CARD NUMBER"
                    className="bg-gray-50 border border-gray-100 py-3 px-4 text-[11px] font-bold tracking-widest focus:ring-1 focus:ring-black outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="bg-gray-50 border border-gray-100 py-3 px-4 text-[11px] font-bold tracking-widest focus:ring-1 focus:ring-black outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="bg-gray-50 border border-gray-100 py-3 px-4 text-[11px] font-bold tracking-widest focus:ring-1 focus:ring-black outline-none"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* --- RIGHT: ORDER SUMMARY (Sticky) --- */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-28">
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-lg font-black uppercase tracking-tighter italic mb-8 border-b pb-4">
                Order Summary
              </h3>

              {/* Product List */}
              <div className="flex flex-col gap-6 mb-8">
                {cartItems?.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-100 overflow-hidden">
                      <img
                        src={`${item?.img}`}
                        alt="prod"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex  items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-tight">
                          {item?.productName}
                        </h4>
                        <button onClick={() => handelDelete(item?._id)}>
                          <Trash
                            size={14}
                            className=" text-black hover:cursor-pointer"
                          />{" "}
                        </button>
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
                        Size: {item?.size} | Qty: {item?.totalQuantity}
                      </p>
                      <span className="text-xs font-black mt-2">
                        $ {item?.productPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* --- COUPON INPUT SECTION --- */}
              <div className="mb-8 p-4 bg-gray-50 border border-dashed border-gray-300">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  Discount Coupon
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    // value={couponCode}
                    // onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 bg-white border border-gray-200 py-2 px-3 text-[10px] font-bold uppercase focus:ring-1 focus:ring-black outline-none"
                  />
                  <button
                    type="button"
                    // onClick={handleApplyCoupon}
                    className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-gray-800 transition-all"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[8px] font-bold text-gray-400 mt-2 italic">
                  Try: "SAVE10" for 10% off
                </p>
              </div>

              {/* Pricing Breakdown */}
              <div className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-widest border-t border-b py-6 border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>$ {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600">$ 15</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-gray-900 text-sm font-black italic">
                  <span>Total</span>
                  <span>$ {subtotal + 15}</span>
                </div>
              </div>

              {/* Order Button */}
              <button className="w-full bg-[#1A1A1A] text-white py-5 mt-8 flex items-center justify-center gap-3 hover:bg-black transition-all group active:scale-[0.98] shadow-xl">
                <Lock size={16} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  Complete Order
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <Info size={12} />
                Secure SSL encrypted payment
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
