import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-red-400 to-pink-400 z-50 shadow-md">
      <div className="w-full h-full flex items-center justify-between px-6">

        {/* LEFT: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="bg-white p-2 rounded-md shadow hover:bg-gray-100"
          >
            ☰
          </button>

          <Link to="/" className="text-3xl font-extrabold text-black">
            RechargeX
          </Link>
        </div>

        {/* CENTER NAV (Help removed) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-black text-lg hover:underline">
            Home
          </Link>
          <Link to="/plans" className="text-black text-lg hover:underline">
            Recharge Plans
          </Link>
        </nav>

        {/* RIGHT AUTH */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-black font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-red-500 px-4 py-1 rounded-md font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-black font-semibold hidden md:block">
                Hello, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
