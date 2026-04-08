import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BgImg from "../../assets/bg-home1.png";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { LogToast } from "../../Components/Shared/LogToast";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", formData, {
        withCredentials: true,
      });

      const { success, message } = res.data;

      if (message === "Wrong password") {
        return Swal.fire({
          icon: "error",
          title: "Wrong Password",
          text: message || "Something went wrong",
        });
      }

      if (message === "User not found") {
        return Swal.fire({
          icon: "error",
          title: "This Email Is Not Registered On Our Website",
          text: message || "Something went wrong",
        });
      }

      if (success) {
        LogToast("Log In Successful", "ACTIVE");
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Log In Failed",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#f2f2f2] font-sans overflow-hidden py-20 px-6">
      <title>LogIn-Page</title>
      {/* 1. Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${BgImg})`,
          opacity: 0.5,
        }}
      />

      {/* 2. Texture Overlay */}
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.85] text-gray-900">
            WELCOME <br /> BACK.
          </h1>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Secure access to your XIV profile
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-2xl border border-white/50 relative overflow-hidden">
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="MEMBER@XIV.COM"
                  className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-tighter focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size={14}
                  className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 py-4 pl-12 pr-12 text-sm font-bold focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 group hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl"
            >
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Identify Member
              </span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-gray-100"></div>
            <span className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-gray-200 py-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              <img
                src="https://www.google.com/favicon.ico"
                className="w-3 h-3"
                alt="Google"
              />
              <span className="text-[9px] font-black uppercase tracking-widest">
                Google
              </span>
            </button>
            <button className="border border-gray-200 py-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              <LogIn className="w-3 h-3 text-gray-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">
                Guest
              </span>
            </button>
          </div>
        </div>

        {/* Redirect to Register */}
        <p className="text-center mt-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="text-black border-b border-black pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-colors"
          >
            Create Profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
