import Swal from "sweetalert2";

export const ShowProtocolErrorAlert = (title, errorMessage) => {
  Swal.fire({
    title: title.toUpperCase(),
    html: `
      <div className="space-y-2">
        <p class="text-[10px] tracking-[0.2em] font-black text-red-600 uppercase italic mb-2">
          System Breach / Protocol Failure
        </p>
        <p class="text-[11px] tracking-widest font-bold text-gray-400 uppercase leading-relaxed">
          Reason: <span class="text-black underline underline-offset-4">${errorMessage}</span>
        </p>
      </div>
    `,
    icon: "error",
    iconColor: "#d33", // Elite Red
    background: "#fff",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    backdrop: `rgba(211, 47, 47, 0.1) backdrop-blur-sm`, 
    customClass: {
      popup: "rounded-none border-t-8 border-red-600 shadow-2xl p-10",
      title: "font-black italic tracking-tighter uppercase text-2xl mb-2 text-black",
      timerProgressBar: "bg-red-600 h-[2px]",
    },
  });
};