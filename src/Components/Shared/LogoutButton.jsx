import { LogToast } from "./LogToast";
import { ShowProtocolErrorAlert } from "./ShowProtocolErrorAlert";

const handleLogout = async (axiosInstance) => {
  try {
    await axiosInstance.post("/logout", {}, { withCredentials: true });

    LogToast("Logout Successful", "INACTIVE");

    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  } catch (error) {
   ShowProtocolErrorAlert(error, "Logout Failed");
  }
};

export default handleLogout;