import React, { useState } from "react";
import { BsCheck, BsPerson } from "react-icons/bs";
import { IndianRupee, Star } from "lucide-react";
import DoctorProfileForm from "../../components/doctor/DoctorProfileForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const queryClient = useQueryClient();
  const doctorProfileItem = ({ icon, text, number }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-3 text-blue-600">{icon}</div>

        <p className="text-sm text-gray-500">{text}</p>

        <p className="text-2xl font-bold text-gray-800 mt-1">{number}</p>
      </div>
    );
  };
  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor");
      return response.data?.data;
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(`doctor/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
      toast.success("Profile updated");
    },
    onError: (err) => {
      console.log(err.response.data.message);
      toast.error(err.response?.data?.message || "Failed to update profiles");
    },
  });
  if (isLoading) return null;
  // console.log(doctor.image);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Doctor Header */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32" />

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 -mt-16">
            <img
              src={doctor?.image}
              alt={doctor?.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {doctor?.name}
              </h1>

              <p className="text-blue-600 font-medium mt-1">
                {doctor?.specialization}
              </p>

              <p className="text-gray-500 mt-2">{doctor?.qualification}</p>
            </div>

            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  doctor?.availability === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor?.availability}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {doctorProfileItem({
          icon: <BsPerson />,
          text: "Patients",
          number: "23K",
        })}

        {doctorProfileItem({
          icon: <BsCheck />,
          text: "Success Rate",
          number: `${doctor?.successRate}%`,
        })}

        {doctorProfileItem({
          icon: <Star />,
          text: "Rating",
          number: `₹${doctor?.rating}`,
        })}

        {doctorProfileItem({
          icon: <IndianRupee />,
          text: "Consultation Fee",
          number: `₹${doctor?.fee}`,
        })}
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

        <DoctorProfileForm {...doctor} updateProfile={updateProfile} />
      </div>
    </div>
  );
};

export default DoctorProfile;
