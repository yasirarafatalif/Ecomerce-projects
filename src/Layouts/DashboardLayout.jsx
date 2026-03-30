import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/Dashboard/Shared/DashboardSidebar";
import DashboardNavbar from "../Components/Dashboard/Shared/DashboardNavbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#F2F2F2]">
      {/* Fixed Topbar */}
      <DashboardNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-1 pt-20 overflow-hidden">
        {/* Fixed Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F9F9F9] relative scroll-smooth no-scrollbar">
          {/* Global Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
          
          <div className="relative z-10 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;