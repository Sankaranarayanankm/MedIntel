import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utls/axios";
import toast from "react-hot-toast";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/patient`);
      return response.data?.data;
    },
  });
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put("/patient", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("user udpated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "failed to update"),
  });
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  console.log(user);
  if (isLoading) return null;
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={`https://ui-avatars.com/api/?name=${formData.name}&size=200`}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />

            <div className="text-center md:text-left text-white">
              <h2 className="text-3xl font-bold">{formData.name}</h2>
              <p className="text-blue-100">{formData.email}</p>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                Active Patient
              </span>
            </div>
          </div>

          {!isEditing && (
            <button
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:scale-105 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {formData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {formData.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  {formData.phone}
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Gender
              </label>

              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 capitalize">
                  {formData.gender}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
              <button
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
