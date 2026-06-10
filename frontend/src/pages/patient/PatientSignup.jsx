import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Phone, User, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";
import { toast } from "react-hot-toast";

const PatientSignup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirm: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const reset = () => {
    setInput({
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      password: "",
      confirm: "",
    });
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("auth/patient-signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Signed in successfully");
      const serializedUser = JSON.stringify(data);
      localStorage.setItem("user", serializedUser);
    },
    onError: (error) => toast.error(err.message || "Failed to Sign-in"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.confirm) {
      toast.error("passwords are not matching");
      return;
    }
    console.log(input);
    signup(input);

    reset();
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex bg-blue-600 text-white p-12 flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to MedIntel
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Create your patient account to book appointments, access medical
            services, manage prescriptions, and connect with trusted doctors.
          </p>
          <div className="mt-10 space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              ✓ Easy Appointment Booking
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Secure Healthcare Records
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Trusted Medical Services
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900">Patient Signup</h2>

          <p className="text-gray-500 mt-2">Create your healthcare account</p>

          <form className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="font-medium block mb-2">Full Name</label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleInput}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-medium block mb-2">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={handleInput}
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium block mb-2">Phone Number</label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={input.phone}
                  name="phone"
                  onChange={handleInput}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* DOB + Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium block mb-2">Date of Birth</label>

                <input
                  type="date"
                  value={input.dob}
                  name="dob"
                  onChange={handleInput}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-medium block mb-2">Gender</label>

                <select
                  value={input.gender}
                  name="gender"
                  onChange={handleInput}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium block mb-2">Password</label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={`${!togglePassword ? "text" : "password"}`}
                  value={input.password}
                  name="password"
                  onChange={handleInput}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setTogglePassword((prev) => !prev)}
                >
                  {togglePassword ? (
                    <EyeOff
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-medium block mb-2">Confirm Password</label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={`${!toggleConfirmPassword ? "text" : "password"}`}
                  value={input.confirm}
                  name="confirm"
                  onChange={handleInput}
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setToggleConfirmPassword((prev) => !prev)}
                >
                  {toggleConfirmPassword ? (
                    <EyeOff
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {isPending ? "Please Wait" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/patient/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
