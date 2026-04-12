import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Layers,
  TextQuote,
  CheckCircle2,
  Palette,
  ArrowLeft,
  X,
  Plus,
  Trash2,
  ImageIcon,
  LinkIcon,
} from "lucide-react";
import useAxios from "../../../../Hooks/useAxios";
import Swal from "sweetalert2";
import PremiumSpinner from "../../../../Components/Shared/PremiumSpinner";
import { ShowProtocolUpdatedAlert } from "../../../../Components/Shared/ShowProtocolUpdatedAlert";
import { ShowProtocolErrorAlert } from "../../../../Components/Shared/ShowProtocolErrorAlert";
import { u } from "framer-motion/m";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state) {
      setFormData({
        ...state,
        thumbnails: state.thumbnails || [],
        colors: state.colors || [],
        inventory: state.inventory || [],
      });
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [state, id]);

  const fetchProduct = async () => {
    try {
      const res = await axiosSecure.get(`/products/${id}`);
      const data = res.data.result || res.data;
      setFormData({
        ...data,
        thumbnails: data.thumbnails || [],
        colors: data.colors || [],
        inventory: data.inventory || [],
      });
    } catch (error) {
      ShowProtocolErrorAlert(
        "Load Failed",
        "An error occurred while loading the product.",
      );
      navigate("/dashboard/collections");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addSlot = (field, defaultValue) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const removeSlot = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const totalStock = formData.inventory.reduce(
      (acc, curr) => acc + (parseInt(curr.quantity) || 0),
      0,
    );

    const cleanedThumbnails = (formData.thumbnails || [])
      .map((thumb) => thumb.trim())
      .filter((thumb) => thumb !== "");

    const updatedProduct = {
      ...formData,
      thumbnails: cleanedThumbnails,
      stock: totalStock,
      updatedAt: new Date().toISOString(),
    };
    const producId = formData._id;

    try {
      const res = await axiosSecure.patch(`/products/${producId}`, updatedProduct);

      if (res.data.modifiedCount > 0 || res.data.success) {
        ShowProtocolUpdatedAlert(
          "Product Updated",
          "The product details have been successfully updated.",
        );
        navigate("/dashboard/manage-orders");
      }
    } catch (err) {
      console.error(err);
      ShowProtocolErrorAlert(
        "Update Failed",
        "An error occurred while updating the product.",
      );
    }
  };

  if (loading || !formData) return <PremiumSpinner />;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 space-y-12 pb-20">
      <title>ZERO FAISHON || UPDATE PRODUCT PAGE</title>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-10">
        <div className="space-y-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-4"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
            EDIT ACQUISITION.
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 xl:grid-cols-12 gap-10"
      >
        <div className="xl:col-span-8 space-y-10">
          {/* CORE SPECS */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 space-y-8 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700"></div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3">
              <TextQuote size={18} className="text-blue-700" /> Core
              Specifications
            </h3>
            <div className="space-y-6">
              <input
                type="text"
                value={formData.title}
                required
                className="w-full bg-gray-50 border-none py-4 px-6 text-sm font-black uppercase outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="number"
                  value={formData.price}
                  required
                  className="w-full bg-gray-50 py-4 px-6 text-sm font-black outline-none"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <input
                  type="number"
                  value={formData.discountPrice}
                  className="w-full bg-gray-50 py-4 px-6 text-sm font-black outline-none"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* MAIN IMAGE LINK */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <ImageIcon size={16} /> Primary Image URL
            </h3>
            <input
              type="text"
              value={formData.img}
              required
              className="w-full bg-gray-50 py-4 px-6 text-[10px] font-black outline-none italic border border-gray-100"
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
            />
            <div className="mt-4 w-32 aspect-[3/4] bg-gray-50 border overflow-hidden">
              <img
                src={formData.img}
                alt="Preview"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* SECONDARY IMAGES (THUMBNAILS) - Color Palette Style */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700"></div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Layers size={16} className="text-blue-700" /> Secondary Gallery
                Links
              </h3>
              <button
                type="button"
                onClick={() => addSlot("thumbnails", "")}
                className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-blue-700"
              >
                + Add Image Link
              </button>
            </div>
            <div className="space-y-3">
              {formData.thumbnails?.map((thumb, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-2 border border-gray-100 group"
                >
                  <div className="w-10 h-12 bg-white overflow-hidden border">
                    <img
                      src={thumb}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none text-[10px] font-black outline-none italic"
                    value={thumb}
                    placeholder="PASTE IMAGE URL..."
                    onChange={(e) =>
                      updateField("thumbnails", i, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeSlot("thumbnails", i)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (SETTINGS, COLORS, SIZES) */}
        <div className="xl:col-span-4 space-y-10">
          {/* COLORS */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Palette size={14} /> Colors
              </h3>
              <button
                type="button"
                onClick={() => addSlot("colors", "")}
                className="text-[8px] font-black border border-black px-2 py-1 hover:bg-black hover:text-white"
              >
                +
              </button>
            </div>
            <div className="space-y-2">
              {formData.colors?.map((color, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-gray-50 py-2 px-3 text-[10px] font-black uppercase outline-none"
                    value={color}
                    onChange={(e) => updateField("colors", i, e.target.value)}
                  />
                  <button type="button" onClick={() => removeSlot("colors", i)}>
                    <X size={12} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 hover:bg-blue-700 transition-all shadow-2xl active:scale-95 group"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">
              Apply Changes
            </span>
            <CheckCircle2
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
