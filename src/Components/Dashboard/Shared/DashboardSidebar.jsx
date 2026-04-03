import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, Users, PlusSquare, 
  Settings, LogOut, Heart, Package, Activity, 
  RotateCcw,
  PackagePlus,
  Layers,
  Shield,
  CreditCard,
  Ticket,
  MessageSquare,
  BarChart3,
  Settings2,
  Image
} from "lucide-react";
import useAuth from "../../../Hooks/useAuth"; 
import useRole from "../../../Hooks/useRole";
const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth(); // Logged in user er info nibo
  const location = useLocation();
  const {role}= useRole();
  // const role = user?.role; 

  // --- 1. Menu Items Configuration ---
 const adminMenuItems = [
  { name: "Command Center", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    // Products
  { name: "Collections", path: "/dashboard/manage-orders", icon: <Layers size={18} /> },
  { name: "Add Artifact", path: "/dashboard/add-product", icon: <PackagePlus size={18} /> },
  

  // Orders
  { name: "Order Vault", path: "/dashboard/orders", icon: <ShoppingBag size={18} /> },
  { name: "Return Requests", path: "/dashboard/returns", icon: <RotateCcw size={18} /> },



  // Users
  { name: "Users List", path: "/dashboard/users", icon: <Users size={18} /> },
  { name: "Access Control", path: "/dashboard/roles", icon: <Shield size={18} /> },

  // Payments
  { name: "Transaction Logs", path: "/dashboard/payments", icon: <CreditCard size={18} /> },

  // Marketing
  { name: "Promo Engine", path: "/dashboard/coupons", icon: <Ticket size={18} /> },
  { name: "Banner Control", path: "/dashboard/banners", icon: <Image size={18} /> },

  // Reviews
  { name: "Feedback Hub", path: "/dashboard/reviews", icon: <MessageSquare size={18} /> },
  { name: "Insight Reports", path: "/dashboard/reports", icon: <BarChart3 size={18} /> },
  { name: "System Settings", path: "/dashboard/settings", icon: <Settings2 size={18} /> },
];
  const staffMenuItems = [
    { name: "Command Center", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Order Vault", path: "/dashboard/orders", icon: <ShoppingBag size={18} /> },
    { name: "Inventory", path: "/dashboard/products", icon: <PlusSquare size={18} /> },
    { name: "Citizen List", path: "/dashboard/users", icon: <Users size={18} /> },
  ];

  const userMenuItems = [
    { name: "Profile View", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Acquisitions", path: "/dashboard/my-orders", icon: <Package size={18} /> },
    { name: "My Wishlist", path: "/dashboard/wishlist", icon: <Heart size={18} /> },
  ];

  // Common item (shobai dekhbe)
  const commonMenuItems = [
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} h-[calc(100vh-80px)] top-20 shadow-sm lg:shadow-none`}>
        <div className="h-full flex flex-col p-8 overflow-y-auto no-scrollbar">
          
          <nav className="flex-1 space-y-2">
            {/* --- Dynamic Heading Based on Role --- */}
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6 italic">
              {role === "admin" ? "Admin Console" : "Member Portal"}
            </p>

            {/* --- Render Admin Routes --- */}
            {role === "admin" && adminMenuItems.map((item) => (
              <SidebarLink key={item.name} item={item} location={location} setIsOpen={setIsOpen} />
            ))}
            {role === "staff" && staffMenuItems.map((item) => (
              <SidebarLink key={item.name} item={item} location={location} setIsOpen={setIsOpen} />
            ))}

            {/* --- Render User Routes --- */}
            {role === "user" && userMenuItems.map((item) => (
              <SidebarLink key={item.name} item={item} location={location} setIsOpen={setIsOpen} />
            ))}

            {/* --- Render Common Routes --- */}
            <div className=" border-t border-gray-50 mt-4 space-y-2">
              {commonMenuItems.map((item) => (
                <SidebarLink key={item.name} item={item} location={location} setIsOpen={setIsOpen} />
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="pt-8 border-t border-gray-100 mt-auto">
            <button 
              onClick={() => {/* Logout Logic */}}
              className="flex items-center gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors w-full group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Terminal Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

// --- Reusable Link Component for Cleanliness ---
const SidebarLink = ({ item, location, setIsOpen }) => (
  <Link
    to={item.path}
    onClick={() => setIsOpen(false)}
    className={`flex items-center gap-4 px-5 py-4 transition-all group ${
      location.pathname === item.path 
      ? "bg-black text-white italic shadow-lg translate-x-1" 
      : "text-gray-400 hover:text-black hover:bg-gray-50 border-b border-transparent"
    }`}
  >
    <span className={location.pathname === item.path ? "text-blue-500" : "group-hover:text-black"}>
      {item.icon}
    </span>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
  </Link>
);

export default DashboardSidebar;