import Swal from "sweetalert2";

export const ShowDeleteConfirmation = (title, text) => {
  return Swal.fire({
    title: title.toUpperCase() || "AUTHORIZE EXTRACTION?",
    html: `
      <div class="space-y-3">
        <p class="text-[11px] tracking-widest font-bold text-gray-400 uppercase leading-relaxed">
          ${text || "This action will permanently decommission the selected asset from the vault."}
        </p>
      </div>
    `,
    icon: "warning",
    iconColor: "#000",
    showCancelButton: true,
    confirmButtonText: "CONFIRM DELETE",
    cancelButtonText: "ABORT",
    confirmButtonColor: "#000", 
    cancelButtonColor: "#000",
    reverseButtons: true, 
    background: "#fff",
    backdrop: `rgba(0,0,0,0.5) backdrop-blur-sm`,
    customClass: {
      popup: "rounded-none border-t-8 border-black shadow-2xl p-10",
      title: "font-black italic tracking-tighter uppercase text-3xl mb-2 text-black",
      confirmButton: "rounded-none text-[10px] font-black uppercase tracking-widest px-8 py-4",
      cancelButton: "rounded-none text-[10px] font-black uppercase tracking-widest px-8 py-4 border border-gray-200 text-black",
    },
  });
};