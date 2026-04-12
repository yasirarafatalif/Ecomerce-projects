import React, { useState } from "react";
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Plus,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../../Hooks/useAxios";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";

const CollectionsPage = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [selectedProducs, setselectedProducs]= useState([])

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-inventory", selectedCategory],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const categories = [
    "All",
    "T-SHIRTS",
    "JEANS",
    "JACKETS",
    "ACCESSORIES",
    "BEST SELLERS",
  ];

  const filteredProducts = products.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory,
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "EXTRACT FROM VAULT?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, DELETE",
      background: "#fff",
      color: "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("REMOVED!", "Product has been extracted.", "success");
          }
        });
      }
    });
  };

  const handelEdit = (p) => {
    navigate("/dashboard/update-products", { state: p });
  };

  if (isLoading) return <PremiumSpinner />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      <title>ZERO FAISHON || COLLECTIONS PAGE</title>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-gray-200 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
            THE COLLECTIVE.
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="relative group sm:w-80 shadow-sm transition-all focus-within:shadow-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="SEARCH VAULT..."
              className="w-full bg-white border-none py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
          <Link to="/dashboard/add-product">
            <button className="bg-black text-white px-8 py-4 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 shadow-2xl">
              <Plus size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Add New Piece
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* --- CATEGORY FILTER BAR --- */}
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-2 md:px-0">
        {categories.map((category) => {
          const count = products.filter((p) => p.category === category).length;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative flex-shrink-0 flex items-center gap-2 md:gap-3 pb-2 md:pb-3 transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? "text-black opacity-100 scale-105"
                  : "text-gray-400 hover:text-gray-600 opacity-70"
              }`}
            >
              {/* Category Name */}
              <span
                className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] ${
                  selectedCategory === category ? "italic" : ""
                }`}
              >
                {category}
              </span>

              {/* Count Badge */}
              <span
                className={`text-[8px] md:text-[10px] font-black px-1.5 py-0.5 border rounded ${
                  selectedCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-400 border-gray-200 group-hover:border-gray-400"
                } transition-all`}
              >
                {count.toString().padStart(2, "0")}
              </span>

              {/* Active Line */}
              {selectedCategory === category && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full transition-all duration-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Product
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Details
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Stock Status
                </th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr
                    key={item._id}
                    className="group/row hover:bg-gray-50/80 transition-all duration-300"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-20 bg-gray-100 overflow-hidden relative shadow-sm border border-gray-50 group-hover/row:border-black transition-all duration-500">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[30%] group-hover/row:grayscale-0 group-hover/row:scale-110 transition-all duration-700"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase italic tracking-tighter text-gray-900 group-hover/row:text-blue-700 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[9px] font-bold text-gray-300 uppercase mt-1 tracking-widest">
                            UID: {item._id.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-8">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-600 italic w-fit">
                          {item.category}
                        </span>
                        <p className="text-[11px] font-black text-gray-900 italic tracking-tighter leading-none">
                          BDT {item.discountPrice || item.price}
                        </p>
                      </div>
                    </td>

                    <td className="p-8">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${item.stock > 0 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500 animate-pulse"}`}
                        ></div>
                        <p className="text-[11px] font-black uppercase italic tracking-tighter text-gray-900 leading-none">
                          {item.stock} IN STOCK
                        </p>
                      </div>
                    </td>

                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3  group-hover/row:opacity-100 translate-x-4 group-hover/row:translate-x-0 transition-all duration-500">
                        <button
                          onClick={() => handelEdit(item)}
                          className="p-3 bg-white border hover:cursor-pointer border-gray-100 text-gray-400 hover:bg-black hover:text-white transition-all shadow-sm"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-white border hover:cursor-pointer border-gray-100 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-20 text-center text-[11px] font-black uppercase tracking-widest text-gray-300 italic"
                  >
                    No acquisitions found in {selectedCategory}.
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

export default CollectionsPage;
