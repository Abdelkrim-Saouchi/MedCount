import { Dispatch, SetStateAction, useState } from "react";
import { Home, PackagePlus } from "lucide-react";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

const Layout = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create_drug", icon: PackagePlus, label: "Ajouter" },
  ];

  return (
    <div className="flex min-h-dvh bg-[#f3f3f3]">
      {/* Side Menu */}
      <SideBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 transition-[margin] duration-300 ${isMenuOpen ? "ml-0 md:ml-[50px]" : "ml-0 md:ml-[10px]"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
