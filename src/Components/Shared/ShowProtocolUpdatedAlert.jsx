import Swal from "sweetalert2";

export const ShowProtocolUpdatedAlert = (title, Status) => {
  Swal.fire({
    title: title,
    html: `
      <p class="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
        Order status synchronized to 
        <span class="text-black italic underline underline-offset-4">
          ${Status}
        </span>
      </p>
    `,
    icon: "success",
    iconColor: "#000",
    background: "#fff",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    backdrop: `rgba(0,0,0,0.5)`,
    customClass: {
      popup: "rounded-none border-t-8 border-black shadow-2xl p-10",
      title:
        "font-black italic tracking-tighter uppercase text-2xl mb-2 text-black",
      timerProgressBar: "bg-blue-700 h-[2px]",
    },
  });
};