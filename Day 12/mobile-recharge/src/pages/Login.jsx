// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter valid email address";
    }
    
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await login({ email, password });
    if (result.success) {
      navigate("/plans");
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div className="w-screen min-h-screen flex pt-16">
      {/* LEFT SLIDER */}
      <div className="hidden lg:block w-1/2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          className="h-full"
        >
          {[
            {
              title: "No more spam calls",
              text: "Manage all your preferences easily",
              img: "https://i.pinimg.com/1200x/f3/42/bf/f342bf4f46e9f5dcd85568977700f88e.jpg",
            },
            {
              title: "Stay connected",
              text: "Recharge & manage everything in one place",
              img: "https://i.pinimg.com/1200x/bf/74/ed/bf74ed4c1226deca1b7c2cf392199911.jpg",
            },
            {
              title: "Smarter recharges",
              text: "Get offers, plans & faster payments",
              img: "https://i.pinimg.com/1200x/e4/f4/c5/e4f4c5f3fae5a6563c81dd7d3067a27d.jpg",
            },
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="h-full flex flex-col justify-center p-12 text-white"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(${slide.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1 className="text-5xl font-extrabold">{slide.title}</h1>
                <p className="text-lg mt-4">{slide.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Login to RechargeX
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">


            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border rounded-lg ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;