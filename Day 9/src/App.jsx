import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RechargePlans from "./pages/RechargePlans";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory"; // ✅ ADD THIS

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<RechargePlans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<PaymentHistory />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
