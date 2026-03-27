import React, { useState } from "react";
import {
  Package,
  Search,
  ChevronRight,
  CheckCircle2,
  Truck,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Filter,
  ArrowRight,
} from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import PremiumLoader from "../../../Components/Shared/PremiumSpinner";
import { Link } from "react-router-dom";
import useRole from "../../../Hooks/useRole";

const AdvancedOrders = () => {
  const axois = useAxios();
  const {role}= useRole();
  console.log(role)
  const { user } = useAuth();
  const email = user?.email;
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Processing", "In Transit", "Delivered", "Cancelled"];
  const [searchOrderId, setSearchOrderId] = useState("");
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["My-orders", email, activeTab],
    enabled: !!email,
    queryFn: async () => {
      let url = `/orders?email=${email}`;
      if (activeTab !== "All") {
        url += `&status=${activeTab}`;
      }
      const res = await axois.get(url);
      return res.data.result;
    },
  });

  if (isLoading) {
    return <PremiumLoader></PremiumLoader>;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] pt-28 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <title>My Orders Page</title>
        {/* --- 1. HEADER & SEARCH --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-gray-900 leading-none">
              Order History
            </h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-4">
              Manage your aesthetic wardrobe journey
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group flex-1 sm:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                size={16}
              />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="SEARCH ORDER ID..."
                className="w-full bg-white border-none py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none shadow-sm transition-all"
              />
            </div>
            <button className="bg-black text-white px-8 py-4 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
              <Filter size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Filter
              </span>
            </button>
          </div>
        </div>

        {/* --- 2. ADVANCED TABS (Filters) --- */}
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar border-b border-gray-200 mb-10 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap relative ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black animate-in fade-in slide-in-from-left-2" />
              )}
            </button>
          ))}
        </div>

        {/* --- 3. ORDERS LIST --- */}
        <div className="flex flex-col gap-10">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white group transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-black/5"
              >
                {/* Order Info Header */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 border-b border-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                    <InfoBlock
                      label="Order Reference"
                      value={`${order?.orderId}`}
                    />
                    <InfoBlock
                      label="Order Placed"
                      value={new Date(order?.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    />
                    <InfoBlock
                      label="Payment Method"
                      value={order?.paymentMethod?.toUpperCase()}
                    />
                    <InfoBlock
                      label="Total Amount"
                      value={`BDT ${order.totalAmount}`}
                      isBold
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={order?.deliveryStatus} />
                    <button className="p-3 bg-gray-50 hover:bg-black hover:text-white transition-all rounded-sm">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Order Items Section */}
                <div className="p-6 md:p-8">
                  <div className="space-y-8">
                    {order?.products?.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6 group/item"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-24 bg-gray-100 overflow-hidden relative shadow-sm">
                            <img
                              src={item.img}
                              alt={item.productName}
                              className="w-full h-full object-cover grayscale-[30%] group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-700"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900 italic leading-none">
                              {item.productName}
                            </h4>
                            <div className="flex gap-4 mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span>Size: {item?.size}</span>
                              <span>Qty: {item.totalQuantity}</span>
                              <span className="text-black font-black italic">
                                Price: ${item.productPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="px-5 py-2.5 border border-gray-200 text-[9px] font-black uppercase tracking-widest hover:border-black transition-colors">
                            Return Item
                          </button>
                          <button className="px-5 py-2.5 border border-gray-200 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                            Buy It Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer / Tracking Progress */}
                <div className="px-6 md:px-8 py-6 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span
                      className={`flex items-center gap-2 ${order.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"}`}
                    >
                      <CheckCircle2 size={14} /> {order.paymentStatus}
                    </span>
                    <span className="flex items-center gap-2 text-black font-bold">
                      <Package size={14} />{" "}
                      {order.deliveryStatus === "Delivered"
                        ? "Delivered to Home"
                        : `Logistics: ${order.deliveryStatus}`}
                    </span>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-8 py-3 bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
                      Track Parcel
                    </button>
                    <button className="flex-1 md:flex-none px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">
                      Review Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* --- EMPTY ORDER STATE --- */
            <div className="flex flex-col items-center justify-center py-32 px-6 bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200">
              <div className="relative mb-8">
                <Package size={80} className="text-gray-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock size={24} className="text-gray-300 animate-pulse" />
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-gray-900 text-center leading-none">
                NO RECENT <br /> ACQUISITIONS.
              </h2>

              <p className="mt-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 text-center max-w-sm leading-relaxed italic">
                Your order vault is currently empty. Start your aesthetic
                journey today.
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

        {/* Empty Style Help */}
        <div className="mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 italic">
            XIV Collections - Est. 2024 - Dhaka
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest underline underline-offset-4">
            <a href="#" className="hover:text-blue-700">
              Need Help?
            </a>
            <a href="#" className="hover:text-blue-700">
              Shipping Policy
            </a>
            <a href="#" className="hover:text-blue-700">
              Returns
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Helper Components
const InfoBlock = ({ label, value, isBold }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
      {label}
    </span>
    <span
      className={`text-[11px] uppercase tracking-tighter ${isBold ? "font-black text-black text-sm italic" : "font-bold text-gray-800"}`}
    >
      {value}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const isDelivered = status === "Delivered";
  return (
    <div
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${
        isDelivered
          ? "bg-green-50 border-green-100 text-green-700"
          : "bg-blue-50 border-blue-100 text-blue-700"
      }`}
    >
      {isDelivered ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      <span className="text-[9px] font-black uppercase tracking-widest italic">
        {status}
      </span>
    </div>
  );
};

export default AdvancedOrders;
