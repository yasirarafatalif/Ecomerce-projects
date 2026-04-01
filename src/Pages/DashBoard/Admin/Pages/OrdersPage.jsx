import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  ChevronRight,
  User,
  LayoutGrid,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import Swal from "sweetalert2";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";

const OrdersPage = () => {
  const axiosSecure = useAxios();
  const [selectedStatus, setSelectedStatus] = useState("All");

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

  const statusOptions = ["All", "Pending", "Shipped", "Delivered"];

  const filteredOrders = orders.filter((order) =>
    selectedStatus === "All" ? true : order.orderStatus === selectedStatus,
  );

  const handleUpdateorderStatus = async (id, neworderStatus) => {
    try {
      const res = await axiosSecure.patch(`/admin-orders/${id}`, {
        orderStatus: neworderStatus,
      });

      if (res.data?.result?.modifiedCount > 0 || res.data?.modifiedCount > 0) {
        ShowProtocolUpdatedAlert("ORDER STATUS UPDATED", neworderStatus);
        refetch();
      } else {
        Swal.fire({
          title: "NO CHANGES",
          text: "Order status was not updated.",
          icon: "info",
          background: "#000",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "UPDATE FAILED",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">

        <title>ORDERS STATUS PAGE</title>
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2 mt-2">
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
            ORDER VAULT.
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
          <div className="flex items-center gap-6 pr-6 border-r border-gray-100 hidden md:flex text-right">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">
                Total Acquisitions
              </p>
              <p className="text-xl font-black italic">{orders.length}</p>
            </div>
            <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>

          <div className="relative group sm:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="SEARCH BY ORDER ID..."
              className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-black outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* --- STATUS FILTER TABS --- */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
          <LayoutGrid size={14} className="text-gray-400" />
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
            Filter:
          </span>
        </div>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 whitespace-nowrap ${
              selectedStatus === status
                ? "text-black italic"
                : "text-gray-300 hover:text-black"
            }`}
          >
            {status}
            {selectedStatus === status && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700 animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
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
                  Date
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
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-tighter">
                          #{order._id.toUpperCase()}
                        </span>
                        <ChevronRight
                          size={12}
                          className="text-gray-300 group-hover/row:text-black group-hover/row:translate-x-1 transition-all"
                        />
                      </div>
                    </td>

                    <td className="p-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                          <User size={14} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase italic tracking-tighter text-gray-900">
                            {order.userName || "Guest Citizen"}
                          </p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                            {order.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>

                    <td className="p-8">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 border ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-50 border-green-100 text-green-600"
                            : order.orderStatus === "Shipped"
                              ? "bg-blue-50 border-blue-100 text-blue-600"
                              : "bg-orange-50 border-orange-100 text-orange-600"
                        }`}
                      >
                        {order.orderStatus === "Pending" && <Clock size={12} />}
                        {order.orderStatus === "Shipped" && <Truck size={12} />}
                        {order.orderStatus === "Delivered" && (
                          <CheckCircle size={12} />
                        )}
                        <span className="text-[9px] font-black uppercase tracking-widest italic">
                          {order.orderStatus}
                        </span>
                      </div>
                    </td>

                    <td className="p-8">
                      <p className="text-[11px] font-black text-gray-900 uppercase italic tracking-tighter">
                        BDT {order.totalAmount}
                      </p>
                    </td>

                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-2 translate-x-4 group-hover/row:translate-x-0 group-hover/row:opacity-100 transition-all duration-500">
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Shipped")
                            }
                            className="p-2 bg-black text-white hover:bg-blue-700 transition-all shadow-lg cursor-pointer"
                          >
                            <Truck size={14} />
                          </button>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <button
                            onClick={() =>
                              handleUpdateorderStatus(order._id, "Delivered")
                            }
                            className="p-2 bg-blue-700 text-white hover:bg-green-600 transition-all shadow-lg cursor-pointer"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        <button className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-black transition-all cursor-pointer">
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-20 text-center text-[10px] font-black uppercase text-gray-300 italic tracking-[0.3em]"
                  >
                    Zero records found under status: {selectedStatus}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
