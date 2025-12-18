// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Sidebar (no logout button)
 * - hidden on small screens (md+ visible)
 * - full viewport height (h-screen)
 * - white text for links
 * - left column in page layout
 *
 * Usage:
 * Place Sidebar as a sibling to your main content inside a flex container
 * (e.g. <div className="flex min-h-screen"> <Sidebar /> <main>...</main> </div>)
 */

const Sidebar = () => {
  return (
    <aside
      className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-gray-900/80 to-gray-800/70 p-6"
      aria-label="Sidebar"
      style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Logo / heading */}
      <div className="mb-6">
        <Link to="/" className="text-2xl font-extrabold text-white">
          RechargeX
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <Link
              to="#"
              className="text-white text-lg font-semibold hover:text-red-300 transition"
            >
              My Recharges
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-white text-lg font-semibold hover:text-red-300 transition"
            >
              Payment Methods
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-white text-lg font-semibold hover:text-red-300 transition"
            >
              OTT Bundles
            </Link>
          </li>

          <li>
            <Link
              to="#"
              className="text-white text-lg font-semibold hover:text-red-300 transition"
            >
              Customer Support
            </Link>
          </li>
        </ul>
      </nav>

      {/* Optional bottom spacer — left intentionally blank since you requested no logout */}
      <div className="mt-6" />
    </aside>
  );
};

export default Sidebar;
