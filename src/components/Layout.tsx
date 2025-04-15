import React, { useState } from "react";
import {
  Home,
  Files,
  Settings,
  Mail,
  Calendar,
  Image,
  Music,
  Download,
  User,
  MenuIcon,
  X,
  Layers,
} from "lucide-react";
import SideBar from "./SideBar";

const Layout = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "files", icon: Files, label: "Files" },
    { id: "mail", icon: Mail, label: "Mail" },
    { id: "photos", icon: Image, label: "Photos" },
    { id: "music", icon: Music, label: "Music" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "downloads", icon: Download, label: "Downloads" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* Side Menu */}
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 transition-[margin] duration-300 ${isMenuOpen ? "ml-0 md:ml-[280px]" : "ml-0 md:ml-[70px]"}`}
      >
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          {menuItems.find((item) => item.id === activeItem)?.label}
        </h1>
        <p className="text-gray-600">
          Select an item from the menu to see its content.
        </p>
      </div>
    </div>
  );
};

export default Layout;
