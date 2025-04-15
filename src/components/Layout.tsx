import React, { useState } from "react";
import { Home, Settings, PackagePlus } from "lucide-react";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create_drug", icon: PackagePlus, label: "Ajouter" },
    { path: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* Side Menu */}
      <SideBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 transition-[margin] duration-300 ${isMenuOpen ? "ml-0 md:ml-[280px]" : "ml-0 md:ml-[70px]"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
