import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Layers, LucideProps, Power, X } from "lucide-react";
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
    <>
      <div
        id="sidebar"
        className={`fixed top-0 left-0 z-40 flex h-full flex-col rounded-r-xl bg-gradient-to-b from-blue-50 to-[var(--sidebar-bg)] shadow-xl transition-all duration-300 ease-in-out ${isMenuOpen ? "w-[280px]" : "w-[90px]"} ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* App Logo */}
        <div className="border-b border-blue-100 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-10 w-10 flex-shrink-0 transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-95"
              >
                <Layers className="animate-in fade-in h-6 w-6 text-white duration-300" />
              </button>
              <div
                className={`transition-all duration-300 ${isMenuOpen ? "translate-x-0 opacity-100" : "absolute -left-[9999px] opacity-0"}`}
              >
                <h1 className="text-xl font-bold whitespace-nowrap text-gray-800">
                  MedCount
                </h1>
                <p className="text-xs font-medium whitespace-nowrap text-blue-500">
                  Calculer facilement
                </p>
              </div>
            </div>
            {isMenuOpen && (
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-all duration-200 hover:bg-gray-200 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-1 flex-col items-center py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.path}
                key={item.path}
                className={({ isActive }) =>
                  `group relative mx-2 my-1 flex w-full items-center gap-4 rounded-lg ${isMenuOpen ? "p-6 py-3" : "p-3"} text-sm transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-100 text-blue-600 shadow-md"
                      : "text-gray-600 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-500"
                  } `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? "bg-white shadow-sm" : "group-hover:bg-white group-hover:shadow-sm"} transition-all duration-300`}
                    >
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${isActive ? "scale-110 text-blue-600" : "text-gray-500 group-hover:scale-110 group-hover:text-blue-500"}`}
                      />
                    </div>
                    <span
                      className={`font-medium whitespace-nowrap transition-all duration-300 ${
                        isMenuOpen
                          ? "translate-x-0 opacity-100"
                          : "absolute -left-[9999px] opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>

                    {isActive && (
                      <div className="ml-auto h-5 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 shadow-sm" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {isAuthenticated && (
          <div className="border-t border-blue-100 p-5">
            <button
              onClick={() => setIsAuthenticated(false)}
              className={`group relative ${isMenuOpen ? "mx-2" : "mx-0"} flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg ${isMenuOpen ? "px-4 py-3" : "p-0"} text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-50`}
            >
              <div className="absolute inset-0 w-0 bg-red-100 transition-all duration-300 ease-out group-hover:w-full"></div>
              <div className="relative flex h-9 w-12 items-center justify-center rounded-lg bg-red-50 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                <Power className="h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600" />
              </div>
              <span
                className={`relative transition-all duration-300 group-hover:translate-x-1 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "absolute -left-[9999px] opacity-0"
                }`}
              >
                Se déconnecter
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
