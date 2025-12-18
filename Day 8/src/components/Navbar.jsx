import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-gradient-to-r from-red-400 to-pink-400 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-black tracking-wide"
        >
          RechargeX
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-black hover:text-gray-700 text-lg">
            Home
          </Link>

          <Link to="/plans" className="text-black hover:text-gray-700 text-lg">
            Recharge Plans
          </Link>

          <Link to="/help" className="text-black hover:text-gray-700 text-lg">
            Help
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-black hover:text-gray-700 text-md"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-red-500 px-4 py-1 rounded-md font-semibold hover:bg-gray-100"
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
