import React, { useState } from "react";
import {
  Package,
  Search,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  ChevronRight,
  User,
  LayoutGrid,
  RefreshCw,
  X,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";

const OrdersPage = () => {
  const axiosSecure = useAxios();
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [selectedOrder, setSelectedOrder] = useState(null); // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-orders", selectedStatus],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-orders");
      return res.data.result;
    },
  });

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const filteredOrders = orders.filter(
    (order) => order.orderStatus === selectedStatus,
  );

  const handleUpdateorderStatus = async (id, neworderStatus) => {
    try {
      const res = await axiosSecure.patch(`/admin-orders/${id}`, {
        orderStatus: neworderStatus,
      });
      if (res.data?.result?.modifiedCount > 0 || res.data?.modifiedCount > 0) {
        ShowProtocolUpdatedAlert("ORDER STATUS UPDATED", neworderStatus);
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "UPDATE FAILED",
        icon: "error",
        background: "#000",
        color: "#fff",
      });
    }
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      <title>ORDERS STATUS PAGE</title>

      {/* --- HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
            ORDER VAULT.
          </h1>
        </div>
        {/* Search & Stats code remains same... */}
      </div>

      {/* --- STATUS FILTER TABS --- */}
      <div className="flex items-center gap-10 overflow-x-auto no-scrollbar border-b border-gray-100 pb-4 mb-10">
        {/* --- FILTER LABEL --- */}
        <div className="flex items-center gap-3 pr-8 border-r border-gray-100 shrink-0">
          <div className="w-2 h-2 bg-blue-700 animate-pulse rounded-full"></div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900 italic">
            Filter Intel:
          </span>
        </div>

        {/* --- DYNAMIC STATUS TABS --- */}
        <div className="flex items-center gap-8">
          {statusOptions.map((status) => {
            // Logic to count orders for each status (Optional but Premium)
            const count = orders.filter((o) => o.orderStatus === status).length;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`group hover:cursor-pointer relative flex items-center gap-3 pb-3 transition-all duration-500 whitespace-nowrap ${
                  selectedStatus === status
                    ? "text-black opacity-100 scale-105"
                    : "text-gray-400 hover:text-gray-500 opacity-60"
                }`}
              >
                {/* Status Name */}
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedStatus === status ? "italic" : ""}`}
                >
                  {status}
                </span>

                {/* Dynamic Count Badge (Premium Detail) */}
                <span
                  className={`text-[8px] font-black px-1.5 py-0.5 border ${
                    selectedStatus === status
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 text-gray-400 border-gray-100 group-hover:border-gray-300"
                  } transition-all`}
                >
                  {count.toString().padStart(2, "0")}
                </span>

                {/* Animated Active Line */}
                {selectedStatus === status && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-700 shadow-[0_2px_10px_rgba(29,78,216,0.4)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- ORDERS TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Order Ref
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  User Identity
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Status Protocol
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Revenue
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                  Terminal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="group/row hover:bg-gray-50/80 transition-all duration-300"
                  >
                    <td className="p-8 font-black text-xs">
                      ID: {order._id.toUpperCase()}
                    </td>
                    <td className="p-8">
                      <p className="text-[10px] font-black uppercase italic tracking-tighter text-gray-900">
                        {order.customerName || "Verified Citizen"}
                      </p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                        {order.userEmail}
                      </p>
                    </td>
                    <td className="p-8">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border ${order.orderStatus === "Delivered" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-8 font-black text-sm italic">
                      BDT {order.totalAmount}
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-2  group-hover/row:opacity-100 transition-all">
                        {/* 1. Pending -> Processing */}
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Processing")
                            }
                            className="p-2 bg-black text-white hover:bg-purple-600 shadow-lg cursor-pointer"
                            title="Process Order"
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}
                        {(order.orderStatus === "Pending" ||
                          order.orderStatus === "Processing" ||
                          order.orderStatus === "Shipped") && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Cancelled")
                            }
                            className="p-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 shadow-sm cursor-pointer transition-all active:scale-90"
                            title="Terminate Acquisition"
                          >
                            <X size={14} />
                          </button>
                        )}
                        {/* 2. Processing -> Shipped */}
                        {order.orderStatus === "Processing" && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Shipped")
                            }
                            className="p-2 bg-black text-white hover:bg-blue-600 shadow-lg cursor-pointer"
                          >
                            <Truck size={14} />
                          </button>
                        )}
                        {/* 3. Shipped -> Delivered */}
                        {order.orderStatus === "Shipped" && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Delivered")
                            }
                            className="p-2 bg-blue-700 text-white hover:bg-green-600 shadow-lg cursor-pointer"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {/* View Details Button */}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-black cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-20 text-center text-[10px] font-black uppercase text-gray-300 italic tracking-[0.3em]"
                  >
                    No records in {selectedStatus} vault.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ELITE ORDER DETAILS MODAL --- */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="absolute inset-0"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl shadow-2xl border-t-[12px] border-black animate-in zoom-in-95 duration-500 overflow-hidden">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
                  Acquisition Detail.
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 mt-2">
                  Ref: #{selectedOrder._id.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:rotate-90 transition-transform duration-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar space-y-8">
              {/* Citizen Info */}
              <div className="grid grid-cols-2 gap-8 border-b pb-8 border-gray-50">
                <div>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                    Citizen Identity
                  </p>
                  <p className="text-sm font-black uppercase italic tracking-tighter">
                    {selectedOrder.customerName || "Verified Guest"}
                  </p>
                  <p className="text-[10px] font-bold text-gray-500">
                    {selectedOrder.userEmail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                    Status Protocol
                  </p>
                  <span className="text-[10px] font-black uppercase bg-black text-white px-3 py-1 italic">
                    {selectedOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Product Items */}
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Acquired Assets
                </p>
                {selectedOrder.products?.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-gray-50 border border-gray-100 group"
                  >
                    <div className="w-16 h-20 bg-white border overflow-hidden shrink-0">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-black uppercase italic tracking-tighter">
                          {item.productName}
                        </h4>
                        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">
                          Size: {item.size} | Qty: {item.totalQuantity}
                        </p>
                      </div>
                      <p className="text-xs font-black italic">
                        BDT {item.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase">
                    Transaction Mode
                  </span>
                  <span className="text-[10px] font-black text-black uppercase italic">
                    {selectedOrder.paymentMethod || "Online"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Total Valuation
                </p>
                <p className="text-2xl font-black italic tracking-tighter text-blue-700">
                  BDT {selectedOrder.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
