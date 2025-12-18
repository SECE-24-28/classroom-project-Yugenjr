import { useNavigate } from "react-router-dom";
import PromoBanner from "../components/PromoBanner";

const NAVBAR_HEIGHT = "72px";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-screen overflow-x-hidden bg-cover bg-center bg-no-repeat pt-[72px]"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/7b/f0/9d/7bf09d10dfd7ed7e537f03918885645c.jpg')",
      }}
    >
      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-12">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            RechargeX
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Recharge Instantly & Save More
          </h2>

          <p className="text-lg text-white/90 mb-8">
            Get access to 20+ OTT apps, exclusive offers, and fast recharges.
          </p>

          <button
            onClick={() => navigate("/plans")}
            className="px-10 py-3 bg-red-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-red-600 transition"
          >
            Recharge Now
          </button>
        </div>
      </div>

      {/* PROMO SECTION */}
      <div className="mt-20 px-6">
        <PromoBanner />
      </div>
    </div>
  );
};

export default LandingPage;
