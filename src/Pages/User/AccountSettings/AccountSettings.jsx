import React, { useState, useRef } from "react";
import {
  User,
  Lock,
  Bell,
  MapPin,
  Camera,
  Save,
  ChevronRight,
  EyeOff,
  Eye,
} from "lucide-react";
import Img from "../../../assets/bg-home1.png";
import PremiumSpinner from "../../../Components/Shared/PremiumSpinner";
import useAuth from "../../../Hooks/useAuth";
import { ShowProtocolErrorAlert } from "../../../Components/Shared/ShowProtocolErrorAlert";
import useAxios from "../../../Hooks/useAxios";
import { ShowProtocolUpdatedAlert } from "../../../Components/Shared/ShowProtocolUpdatedAlert";
const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const fileInputRef = useRef(null);
  const axios = useAxios();

  // Image preview state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Lock size={16} /> },
    { id: "notifications", label: "Alerts", icon: <Bell size={16} /> },
    { id: "address", label: "Address", icon: <MapPin size={16} /> },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const uploadToImageBB = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=36b12e6598989a18e98fa47220086add`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      const imageUrl = data.data.url;
      return imageUrl;
    } catch (error) {
      ShowProtocolErrorAlert(
        "Image Upload Failed",
        "Unable to upload image. Please try again.",
      );
      return null;
    }
  };

  const handlePassReset = async (e) => {
    e.preventDefault();
    const form = e.target;

    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;

    const validatePassword = () => {
      if (newPassword.length < 6) {
        return "Password must be at least 6 characters";
      }
      if (!/[A-Z]/.test(newPassword)) {
        return "Must include at least 1 uppercase letter";
      }
      if (!/[0-9]/.test(newPassword)) {
        return "Must include at least 1 number";
      }
      if (!/[!@#$%^&*]/.test(newPassword)) {
        return "Must include at least 1 special character";
      }
      return null;
    };

    const errorMsg = validatePassword();

    if (errorMsg) {
      return ShowProtocolUpdatedAlert("Invalid Password", errorMsg);
    }

    const data = {
      currentPassword,
      newPassword,
    };

    console.log(data);

    // await axios.patch("/update-password", data).then((res) => {
    //   if (res.data.success) {
    //     ShowProtocolUpdatedAlert(
    //       "Password Updated",
    //       "Your password has been successfully updated.",
    //     );
    //     form.reset();
    //   } else {
    //     ShowProtocolErrorAlert(
    //       "Update Failed",
    //       res.data.message || "Unable to update password. Please try again.",
    //     );
    //   }
    // });
  };

  if (!loading) return <PremiumSpinner />;

  return (
    <div className="relative min-h-screen bg-[#F2F2F2] pt-24 md:pt-32 pb-20 font-sans overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${Img})`, opacity: 0.12 }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12">
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-gray-900">
            Settings.
          </h1>
          <p className="mt-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-700 italic">
            Manage your aesthetic identity
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          {/* --- SIDEBAR --- */}
          <aside className="w-full lg:w-64 bg-white/40 backdrop-blur-md border border-white/20 p-1 md:p-2 shadow-sm sticky top-20 z-20">
            <div className="flex lg:flex-col overflow-x-auto no-scrollbar lg:overflow-visible">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 lg:w-full flex items-center justify-between px-5 py-3 md:py-4 transition-all duration-300 group whitespace-nowrap ${activeTab === item.id ? "bg-black text-white" : "hover:bg-gray-100/50 text-gray-500"}`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {item.icon}
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`hidden lg:block ${activeTab === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
            </div>
          </aside>

          {/* --- CONTENT --- */}
          <main className="w-full flex-1 bg-white p-6 md:p-12 shadow-2xl relative min-h-[500px]">
            {activeTab === "profile" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-10 md:mb-12 text-center sm:text-left">
                  {/* Avatar Upload Logic */}
                  <div
                    className="relative group cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-gray-50 flex items-center justify-center font-black text-2xl md:text-3xl italic text-gray-300 shadow-inner">
                      {selectedImage || user?.avatar ? (
                        <img
                          src={selectedImage || user?.avatar}
                          className="w-full h-full object-cover"
                          alt="Citizen"
                        />
                      ) : (
                        <User size={40} />
                      )}
                    </div>
                    {/* Hidden Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />

                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-black text-white p-2 md:p-2.5 rounded-full shadow-xl">
                      <Camera size={14} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">
                      {user?.displayName || "UNNAMED CITIZEN"}
                    </h3>
                    <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">
                      Protocol ID: {user?.uid?.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <InputField
                    label="Identity Name"
                    defaultValue={user?.displayName}
                    placeholder="XIV CITIZEN"
                  />
                  <InputField
                    label="Contact Intel"
                    defaultValue={user?.email}
                    placeholder="email@xiv.com"
                    type="email"
                    disabled
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Communication Line"
                      placeholder="+8801XXXXXXXXX"
                      type="tel"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4 md:mt-6">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();

                        const imageUrl = await uploadToImageBB();

                        if (imageUrl) {
                          console.log("Final Image URL:", imageUrl);

                          // example:
                          await axios
                            .patch("/update-profile", { avatar: imageUrl })
                            .then((res) => {
                              res.data.success
                                ? ShowProtocolUpdatedAlert(
                                    "Profile Updated",
                                    "Your profile has been successfully updated.",
                                  )
                                : ShowProtocolErrorAlert(
                                    "Profile Update Failed",
                                    "Unable to update profile. Please try again.",
                                  );
                            })
                            .catch((err) => {
                              ShowProtocolErrorAlert(
                                "Profile Update Failed",
                                "Unable to update profile. Please try again.",
                              );
                              console.error("Profile update error:", err);
                            });
                        }
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black text-white px-10 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl"
                    >
                      <Save size={16} /> Authorize Sync
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter italic mb-6 md:mb-8 border-b pb-4">
                  Security Protocol
                </h3>
                <form
                  onSubmit={handlePassReset}
                  className="flex flex-col gap-6 max-w-md"
                >
                  {/* Current Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Current Password
                    </label>

                    <div className="relative group">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition"
                        size={18}
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        required
                        placeholder="Enter current password"
                        className="w-full bg-white border border-gray-200 py-4 pl-12 pr-12 text-sm font-semibold focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      New Password
                    </label>

                    <div className="relative group">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition"
                        size={18}
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        required
                        placeholder="Enter new password"
                        className="w-full bg-white border border-gray-200 py-4 pl-12 pr-12 text-sm font-semibold focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hint */}
                  <p className="text-red-500 text-xs leading-relaxed">
                    Password must be at least 6 characters, include an uppercase
                    letter, a number, and a special character.
                  </p>

                  {/* Button */}
                  <button
                    type="submit"
                    className="mt-2 bg-black text-white py-4 text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-xl"
                  >
                    Update Cipher
                  </button>
                </form>
              </section>
            )}

            {/* Baki tabs (Notifications, Address) er static code thakbe... */}
          </main>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  defaultValue,
  name,
  disabled = false,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 italic">
      {label}
    </label>
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className={`bg-gray-50 border border-gray-100 py-3 md:py-4 px-4 md:px-5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase outline-none transition-all w-full ${disabled ? "opacity-50 cursor-not-allowed" : "focus:ring-1 focus:ring-black focus:bg-white"}`}
    />
  </div>
);

export default AccountSettings;
