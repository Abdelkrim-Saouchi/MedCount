import React, { Dispatch, SetStateAction } from "react";
import { Layers, LucideProps, LogOut } from "lucide-react";
import { NavLink } from "react-router";

type MenuItems = {
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

const SideBar = ({
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  isAuthenticated,
  setIsAuthenticated,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuItems: MenuItems[];
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 flex h-full flex-col bg-white shadow-lg transition-all duration-300 md:fixed ${isMenuOpen ? "w-[280px]" : "w-[70px]"} ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* App Logo */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 transition-colors duration-200 hover:bg-blue-700"
          >
            <Layers className="h-6 w-6 text-white" />
          </button>
          <div
            className={`transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"}`}
          >
            <h1 className="text-lg font-bold whitespace-nowrap text-gray-800">
              MedCount
            </h1>
            <p className="text-xs whitespace-nowrap text-gray-500">
              Calculer facilement
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `group relative flex w-full items-center gap-3 px-6 py-3 text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                } `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                      isMenuOpen
                        ? "opacity-100"
                        : "w-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <div className="ml-auto h-5 w-1 rounded-full bg-blue-600" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      {isAuthenticated && (
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors duration-150 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span
              className={`transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "w-0 overflow-hidden opacity-0"
              }`}
            >
              Se déconnecter
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
