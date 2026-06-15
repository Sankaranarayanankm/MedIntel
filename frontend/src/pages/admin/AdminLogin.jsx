import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utls/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  console.log("This is from admin login");
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/admin-login", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      authCtx.login(data);
    },
    onError: (err) => {
      console.log("Error: ", err);
      toast.error(err?.response?.data?.message || "Failed to login");
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
        <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Admin Access Portal
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-8">
            Login to manage doctors, patients, appointments, services, hospital
            operations, and system-wide administration securely.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              ✓ Manage Hospital Services
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Monitor Doctors & Patients
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              ✓ Secure Administrative Access
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900">Admin Login</h2>

          <p className="text-gray-500 mt-2">
            Sign in to access the admin dashboard
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
                  placeholder="Enter admin email"
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-slate-700"
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
                  className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-slate-700"
                />

                <button
                  type="button"
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {togglePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              {isPending ? "Please Wait" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
