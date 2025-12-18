import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ------------------ Yup Validation Schema ------------------ */
const signupSchema = yup.object().shape({
  name: yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Enter a valid email"),
  phone: yup.string().required("Phone is required").matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    if (result.success) {
      alert("Registration successful! Please login.");
      reset();
      navigate("/login");
    } else {
      alert(result.message || "Registration failed");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/* LEFT HERO */}
      <div
        className="hidden md:flex flex-1 p-12 items-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/d4/f8/57/d4f857dca643da1c87003fb191b07bcf.jpg')",
        }}
      >
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-md shadow-xl border border-white/40 max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-4 text-black">
            All your plans. One place.
          </h2>
          <p className="text-lg text-black font-medium">
            Manage recharges, get exclusive offers and pay bills — everything from a single dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SIGNUP CARD */}
      <div className="w-full md:w-[420px] flex items-center justify-center p-8 bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>

          {/* FULL NAME */}
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone Number (10 digits)"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold p-3 rounded-lg transition"
          >
            Signup
          </button>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
