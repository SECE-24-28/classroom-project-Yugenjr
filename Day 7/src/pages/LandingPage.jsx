import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PromoBanner from "../components/PromoBanner";
import Footer from "../components/Footer";
import PlanModal from "../components/PlanModal"; // <- render modal here

const LandingPage = () => {
  return (
    <div
      className="min-h-screen w-screen overflow-x-hidden flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/7b/f0/9d/7bf09d10dfd7ed7e537f03918885645c.jpg')",
      }}
    >
      <Navbar />

      <div className="flex flex-1 w-screen min-h-0">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col items-center p-6">
          <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl p-8 rounded-xl shadow-xl text-center">
            {/* Title inside hero */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              RechargeX
            </h1>

            <h2 className="text-3xl md:text-4xl font-semibold text-white/95 mb-3">
              Recharge Instantly &amp; Save More
            </h2>

            <p className="text-md md:text-lg text-white/80 mb-6">
              Get access to 20+ OTT apps, exclusive offers, and fast recharges.
            </p>

            <button className="px-8 py-3 bg-red-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-red-600 transition">
              Recharge Now
            </button>
          </div>

          {/* Modal listens to global context and shows when setShowPlanModal(true) */}
          <PlanModal />

          <div className="w-full mt-10">
            <PromoBanner />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
