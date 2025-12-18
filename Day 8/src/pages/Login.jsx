// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

  const handleGetOtp = () => {
    if (!mobile || mobile.length < 6) {
      alert("Enter a valid mobile number");
      return;
    }
    setOtpRequested(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobile && !email) {
      alert("Enter mobile or email");
      return;
    }
    if (!password && !otpRequested) {
      alert("Enter password or request OTP");
      return;
    }

    login({ email, mobile });
    navigate("/plans");
  };

  return (
    <div className="w-screen min-h-screen flex">
      
      {/* LEFT: Swiper */}
      <div className="hidden lg:block w-1/2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          {/* Image 1 */}
          <SwiperSlide>
            <div
              className="w-full h-full flex flex-col justify-center p-12 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)), url('https://i.pinimg.com/1200x/f3/42/bf/f342bf4f46e9f5dcd85568977700f88e.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-6xl font-extrabold drop-shadow-xl">
                no more spam calls
              </h1>
              <p className="text-lg mt-4 drop-shadow-md">
                DND’s got you covered — manage all your preferences.
              </p>
            </div>
          </SwiperSlide>

          {/* Image 2 */}
          <SwiperSlide>
            <div
              className="w-full h-full flex flex-col justify-center p-12 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)), url('https://i.pinimg.com/1200x/bf/74/ed/bf74ed4c1226deca1b7c2cf392199911.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-6xl font-extrabold drop-shadow-xl">
                stay connected effortlessly
              </h1>
              <p className="text-lg mt-4 drop-shadow-md">
                Recharge & manage everything from one dashboard.
              </p>
            </div>
          </SwiperSlide>

          {/* Image 3 */}
          <SwiperSlide>
            <div
              className="w-full h-full flex flex-col justify-center p-12 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)), url('https://i.pinimg.com/1200x/e4/f4/c5/e4f4c5f3fae5a6563c81dd7d3067a27d.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-6xl font-extrabold drop-shadow-xl">
                smarter recharges
              </h1>
              <p className="text-lg mt-4 drop-shadow-md">
                Get offers, plans & faster payments.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* RIGHT: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 ">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            sign in to RechargeX
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                placeholder="Mobile Number"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </div>

            {/* OTP Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleGetOtp}
                disabled={!mobile || mobile.length < 6}
                className={`flex-1 rounded-full py-3 font-semibold transition ${
                  mobile.length >= 6
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {otpRequested ? "OTP Sent" : "get otp"}
              </button>
            </div>

            <div className="text-center text-sm text-gray-700">or</div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
            >
              Sign in
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-600">
              don't have a RechargeX account?{" "}
              <Link className="font-semibold text-blue-600" to="/signup">
                get now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
