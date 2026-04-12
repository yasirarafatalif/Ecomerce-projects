import React, { useState } from "react";
import { X, AlertCircle, Send } from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import { ShowProtocolUpdatedAlert } from "../../Shared/ShowProtocolUpdatedAlert";

const ReturnModal = ({ isOpen, onClose, email, item }) => {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const axois = useAxios();
  const handleReturnSubmit = async (returnData) => {
    try {
      const res = await axois.post("/returns", returnData);
     
      if (res.data.success) {
        ShowProtocolUpdatedAlert(
          "RETURNS REQUEST",
          "Your return request is being reviewed by Logistics.",
        );
        onClose()
       
      }
    } catch (error) {
      ShowProtocolUpdatedAlert(
        "RETURN REQUEST FAILED",
        "An error occurred while submitting your return request.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl border-t-8 border-black animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              Initialize <br />{" "}
              <span className="text-blue-700 text-4xl font-black italic tracking-tighter uppercase leading-none">
                Return Protocol.
              </span>
            </h3>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mt-4 italic">
              Security ID: {item?.productName?.slice(0, 5)}-
              {Math.floor(Math.random() * 1000)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const returnData = {
              ...item,
              returnReason: reason,
              returnNote: note,
            };
            handleReturnSubmit(returnData);
          }}
          className="p-8 space-y-6"
        >
          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100">
            <AlertCircle className="text-blue-700 shrink-0" size={18} />
            <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest leading-relaxed italic">
              Returns are only authorized for items with verified structural
              defects or sizing errors.
            </p>
          </div>

          {/* Reason Select */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 italic">
              Select Reason
            </label>
            <select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-gray-50 border-none py-4 px-4 text-[11px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none"
            >
              <option value="">Choose Logic...</option>
              <option value="Sizing Issue">Sizing Mismatch</option>
              <option value="Damaged Piece">Defective Construction</option>
              <option value="Wrong Item">Incorrect Dispatch</option>
              <option value="Change of Mind">Aesthetic Conflict</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 italic">
              Additional Intel
            </label>
            <textarea
              rows="4"
              placeholder="DESCRIBE THE ISSUE..."
              className="w-full bg-gray-50 border-none py-4 px-4 text-[11px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none resize-none"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group"
          >
            Authorize Return{" "}
            <Send
              size={14}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;
