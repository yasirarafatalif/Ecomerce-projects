import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BgImg from "../../assets/bg-home1.png"; 
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const axios = useAxios();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/register", formData);

    if (res.data?.message === "User already exists") {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: `This user already exists`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (res.data?.message) {
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: error.response?.data || "Something went wrong",
    });
  }
};

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#f2f2f2] font-sans overflow-hidden py-20 px-6 md:px-12 lg:px-24">
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

      {/* --- Main Responsive Container --- */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        {/* --- LEFT: Header Section (Desktop: Side, Mobile: Top) --- */}
        <div className="text-center lg:text-left flex-1 lg:max-w-[500px]">
          <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-blue-700 mb-3 italic">
            XIV Collective / Member Access
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-gray-900">
            JOIN <br className="hidden md:block" /> THE <br /> COLLECTIVE.
          </h1>
          <p className="mt-6 text-[11px] md:text-sm font-bold uppercase tracking-widest text-gray-500 max-w-[400px] mx-auto lg:mx-0 leading-relaxed">
            Create an account to unlock XIV Exclusive collections, early access,
            and personalized aesthetic recommendations.
          </p>
        </div>

        {/* --- RIGHT: Form Card (Desktop: Side, Mobile: Bottom) --- */}
        <div className="w-full max-w-[450px] flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-2xl border border-white/50 relative overflow-hidden">
            {/* Subtle Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    placeholder="YASIR ARAFAT"
                    className="w-full bg-white border border-gray-200 py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-tighter focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

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
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Password
                </label>
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

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 group hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl"
              >
                <span className="text-xs font-black uppercase tracking-[0.3em]">
                  Initialize Account
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
                Or continue with
              </span>
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>

            {/* Google / Social Button */}
            <button className="w-full border border-gray-200 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
              <img
                src="https://www.google.com/favicon.ico"
                className="w-4 h-4"
                alt="Google"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Google Identity
              </span>
            </button>

            {/* Redirect to Login (Form er bhitorei rakha hoyeche optimized desktop view jonno) */}
            <p className="text-center mt-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-black border-b border-black pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-colors"
              >
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
