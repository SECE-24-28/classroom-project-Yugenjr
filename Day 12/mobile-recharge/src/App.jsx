import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import RechargePlans from "./pages/RechargePlans";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* NAVBAR + SIDEBAR */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/plans" element={<RechargePlans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<PaymentHistory />} />
        <Route path="/user" element={<UserDashboard />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* FALLBACK */}
        <Route path="*" element={<LandingPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
