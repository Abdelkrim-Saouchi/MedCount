import { Dispatch, SetStateAction, useState } from "react";
import { PackagePlus, Calculator } from "lucide-react";
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
    { path: "/", icon: Calculator, label: "Calculer" },
    { path: "/create_drug", icon: PackagePlus, label: "Ajouter médicament" },
  ];

  return (
    <div className="flex min-h-dvh bg-[#f3f3f3] relative">
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
        className={`flex-1 px-4 sm:px-6 md:px-8 py-6 transition-all duration-300 ease-in-out background bg-[var(--soft-bg)] ${
          isMenuOpen ? "md:ml-[280px]" : "md:ml-[70px]"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
