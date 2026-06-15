import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ role, navbarItems }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white relative">
      <div className="flex items-center justify-between px-5 md:px-8 py-4">
        {/* Logo */}
        <div onClick={() => navigate("/")}>
          <h4 className="text-2xl cursor-pointer font-bold text-blue-600">
            MedIntel
          </h4>
          <p className="text-sm text-gray-500">Healthcare Solution</p>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {navbarItems.map((item) => (
            <NavLink
              end={item.path}
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold cursor-pointer"
                  : "text-gray-700 hover:text-blue-600 cursor-pointer transition"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!role ? (
            <>
              <button
                onClick={() => navigate("/doctor/login")}
                className="border cursor-pointer border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Doctor Login
              </button>

              <button
                onClick={() => navigate("/admin/login")}
                className="border cursor-pointer border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                Admin Login
              </button>

              <button
                onClick={() => navigate("/patient/login")}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Patient Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden cursor-pointer "
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="lg:hidden border-t border-gray-200 px-5 py-5 bg-white">
          <div className="flex flex-col gap-4">
            {navbarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path}
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold cursor-pointer"
                    : "text-gray-700 cursor-pointer"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            {!role ? (
              <>
                <button
                  onClick={() => navigate("/doctor/login")}
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg cursor-pointer"
                >
                  Doctor Login
                </button>

                <button
                  onClick={() => navigate("/admin/login")}
                  className="border border-green-600 text-green-600 px-4 py-2 rounded-lg cursor-pointer"
                >
                  Admin Login
                </button>

                <button
                  onClick={() => navigate("/patient/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Patient Login
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
