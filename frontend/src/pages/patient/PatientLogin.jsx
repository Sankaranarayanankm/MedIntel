import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utls/axios";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/patient-login", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      const user = data;
      const serializedUser = JSON.stringify(user);
      localStorage.setItem("user", serializedUser);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      console.log(err.response);
      toast.error(err.response?.data?.message || "Failed to login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { email, password };
    login(obj);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex bg-blue-600 text-white p-12 flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back to MedIntel
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Sign in to manage appointments, access healthcare services, connect
            with doctors, and securely manage your medical records.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              ✓ Manage Appointments
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Access Medical Records
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Trusted Healthcare Services
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900">Patient Login</h2>

          <p className="text-gray-500 mt-2">
            Sign in to access your healthcare dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="font-medium block mb-2">Email Address</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  type={togglePassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {togglePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {isPending ? "Please Wait" : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/patient/signup"
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
