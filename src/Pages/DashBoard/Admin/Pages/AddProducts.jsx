import React, { useState } from "react";
import { 
  Plus, Trash2, Image as ImageIcon, 
  Tag, Layers, DollarSign, TextQuote, 
  CheckCircle2, ArrowRight, X, Palette
} from "lucide-react";
import useAxios from "../../../../Hooks/useAxios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const axiosSecure = useAxios();
  
  // --- Form State Management ---
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    discountPrice: "",
    productCategory: "T-SHIRTS",
    productType: "MEN",
    description: "",
    img: "", 
    thumbnails: [], 
    inventory: [{ size: "M", quantity: 10 }], 
    colors: ["Black"], // Added Colors Array
    onSale: false,      // Added On Sale Toggle
  });

  // --- Inventory Logic ---
  const addInventoryRow = () => {
    setFormData({ ...formData, inventory: [...formData.inventory, { size: "M", quantity: 1 }] });
  };

  const removeInventoryRow = (index) => {
    const updated = formData.inventory.filter((_, i) => i !== index);
    setFormData({ ...formData, inventory: updated });
  };

  const updateInventory = (index, field, value) => {
    const updated = [...formData.inventory];
    updated[index][field] = field === "quantity" ? parseInt(value) || 0 : value;
    setFormData({ ...formData, inventory: updated });
  };

  // --- Color Logic ---
  const addColorSlot = () => setFormData({ ...formData, colors: [...formData.colors, ""] });
  const updateColor = (index, value) => {
    const updated = [...formData.colors];
    updated[index] = value;
    setFormData({ ...formData, colors: updated });
  };
  const removeColor = (index) => {
    const updated = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: updated });
  };

  // --- Thumbnail Logic ---
  const addThumbnailSlot = () => setFormData({ ...formData, thumbnails: [...formData.thumbnails, ""] });
  const updateThumbnail = (index, value) => {
    const updated = [...formData.thumbnails];
    updated[index] = value;
    setFormData({ ...formData, thumbnails: updated });
  };
  const removeThumbnail = (index) => {
    const updated = formData.thumbnails.filter((_, i) => i !== index);
    setFormData({ ...formData, thumbnails: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalStock = formData.inventory.reduce((acc, curr) => acc + curr.quantity, 0);
    
    // Exact JSON match prepare kora
    const finalProduct = { 
      ...formData, 
      stock: totalStock, 
      createdAt: new Date(),
      // Price calculation logics
      onSale: formData.onSale 
    };

    console.log(finalProduct)

    try {
      const res = await axiosSecure.post("/products", finalProduct);
      if (res.data.insertedId) {
        Swal.fire({
          title: "ACQUISITION SUCCESS",
          text: "Item initialized into the vault.",
          icon: "success",
          background: "#fff",
          confirmButtonColor: "#000"
        });
      }
    } catch (err) {
      Swal.fire("ERROR", "Access denied or server timeout.", "error");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-12 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-10">
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
            PRODUCT INITIALIZATION.
        </h1>
        <div className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] italic">
           Access Level: Master Admin
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* LEFT SIDE (8 Cols) */}
        <div className="xl:col-span-8 space-y-10">
          <div className="bg-white p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700"></div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3">
               <TextQuote size={18} className="text-blue-700" /> Core Details
            </h3>

            <div className="space-y-6">
              <input type="text" required placeholder="PRODUCT NAME..." className="w-full bg-gray-50 border-none py-4 px-6 text-sm font-black uppercase tracking-tighter focus:ring-1 focus:ring-black outline-none" onChange={(e) => setFormData({...formData, productName: e.target.value})} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" required placeholder="REGULAR PRICE ($)" className="w-full bg-gray-50 border-none py-4 px-6 text-sm font-black focus:ring-1 focus:ring-black outline-none" onChange={(e) => setFormData({...formData, productPrice: parseFloat(e.target.value)})}/>
                <input type="number" placeholder="SALE PRICE ($)" className="w-full bg-gray-50 border-none py-4 px-6 text-sm font-black focus:ring-1 focus:ring-blue-700 outline-none" onChange={(e) => setFormData({...formData, discountPrice: parseFloat(e.target.value)})}/>
              </div>

              <textarea rows="4" required placeholder="AESTHETIC DESCRIPTION..." className="w-full bg-gray-50 border-none py-4 px-6 text-sm font-bold uppercase outline-none transition-all resize-none" onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>

          {/* COLOR PALETTE SECTION */}
          <div className="bg-white p-6 md:p-10 shadow-sm border border-gray-100 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3">
                 <Palette size={18} /> Color Palette
               </h3>
               <button type="button" onClick={addColorSlot} className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-gray-800">+ Add Color</button>
            </div>
            <div className="flex flex-wrap gap-4">
              {formData.colors.map((color, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 border border-gray-100">
                  <input type="text" placeholder="COLOR..." className="bg-transparent border-none text-[10px] font-black uppercase outline-none w-20" value={color} onChange={(e) => updateColor(i, e.target.value)} />
                  <button type="button" onClick={() => removeColor(i)}><X size={12} className="text-red-400" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* STOCK METRICS */}
          <div className="bg-white p-6 md:p-10 shadow-sm border border-gray-100 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-700"></div>
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3"><Layers size={18} className="text-blue-700" /> Stock Metrics</h3>
               <button type="button" onClick={addInventoryRow} className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-4 py-2">+ Add Variant</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.inventory.map((row, index) => (
                <div key={index} className="flex gap-3 items-center bg-gray-50 p-4 border border-gray-100">
                   <select className="bg-white border-none py-2 px-3 text-[10px] font-black uppercase outline-none flex-1" value={row.size} onChange={(e) => updateInventory(index, "size", e.target.value)}>
                      {["XS", "S", "M", "L", "XL", "2XL", "FREE"].map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                   <input type="number" className="w-20 bg-white border-none py-2 px-3 text-[10px] font-black outline-none" value={row.quantity} onChange={(e) => updateInventory(index, "quantity", e.target.value)}/>
                   <button type="button" onClick={() => removeInventoryRow(index)}><Trash2 size={14} className="text-gray-300" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (4 Cols) */}
        <div className="xl:col-span-4 space-y-10">
          
          {/* Classification & ON SALE TOGGLE */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 space-y-6">
             <h3 className="text-[11px] font-black uppercase italic tracking-widest border-b pb-4 flex justify-between items-center">
                Classification 
                <label className="flex items-center cursor-pointer gap-2">
                   <span className="text-[8px] italic">ON SALE?</span>
                   <input type="checkbox" className="w-4 h-4 accent-blue-700" onChange={(e) => setFormData({...formData, onSale: e.target.checked})} />
                </label>
             </h3>
             <div className="space-y-4">
                <select className="w-full bg-gray-50 py-3 px-4 text-[10px] font-black uppercase outline-none" onChange={(e) => setFormData({...formData, productCategory: e.target.value})}>
                  {["T-SHIRTS", "JEANS", "JACKETS", "BEST SELLERS", "ACCESSORIES"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="w-full bg-gray-50 py-3 px-4 text-[10px] font-black uppercase outline-none" onChange={(e) => setFormData({...formData, productType: e.target.value})}>
                   <option value="MEN">MEN</option><option value="WOMEN">WOMEN</option><option value="UNISEX">UNISEX</option>
                </select>
             </div>
          </div>

          {/* Media Assets */}
          <div className="bg-white p-8 shadow-sm border border-gray-100 space-y-6">
             <h3 className="text-[11px] font-black uppercase italic tracking-widest border-b pb-4">Visual Assets</h3>
             <input type="text" required placeholder="PRIMARY IMAGE URL..." className="w-full bg-gray-50 py-3 px-4 text-[9px] font-bold outline-none" onChange={(e) => setFormData({...formData, img: e.target.value})}/>
             <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-gray-400 flex justify-between">Secondary Gallery</label>
                {formData.thumbnails.map((thumb, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" placeholder="URL..." className="flex-1 bg-gray-50 py-2 px-4 text-[9px] font-bold outline-none" value={thumb} onChange={(e) => updateThumbnail(i, e.target.value)}/>
                    <button type="button" onClick={() => removeThumbnail(i)}><X size={14}/></button>
                  </div>
                ))}
                <button type="button" onClick={addThumbnailSlot} className="text-[9px] font-black uppercase text-blue-700 underline tracking-[0.2em]">+ Add Slot</button>
             </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 hover:bg-blue-700 transition-all shadow-2xl active:scale-95 group">
             <span className="text-[11px] font-black uppercase tracking-[0.4em]">Initialize Piece</span>
             <CheckCircle2 size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;