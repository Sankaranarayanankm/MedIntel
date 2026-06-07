import React, { useState } from "react";
import { PATIENT_NAVBAR } from "../DUMMY/data";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white relative">
      <div className="flex items-center justify-between px-5 md:px-8 py-4">
        {/* Logo */}
        <div>
          <h4 className="text-2xl font-bold text-blue-600">MedIntel</h4>
          <p className="text-sm text-gray-500">Healthcare Solution</p>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {PATIENT_NAVBAR.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `transition duration-200 hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            Doctor Login
          </button>

          <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition">
            Admin Login
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Patient Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="lg:hidden border-t border-gray-200 px-5 py-5 bg-white">
          <div className="flex flex-col gap-4">
            {PATIENT_NAVBAR.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  `transition duration-200 ${
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              Doctor Login
            </button>

            <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition">
              Admin Login
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Patient Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
