import React from "react";
import { CgCalendar } from "react-icons/cg";
import { LuIndianRupee } from "react-icons/lu";
import { FcBusiness } from "react-icons/fc";
import { BiCross } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DoctorAppointmentCard from "../../components/doctor/DoctorAppointmentCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const dashboardItem = (icon, text, number) => {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all">
        <div>
          <p className="text-gray-500 text-sm">{text}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{number}</p>
        </div>

        <div className="text-4xl">{icon}</div>
      </div>
    );
  };
  const { data: doctor, isLoading: loadingDoctor } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor");
      return response.data?.data;
    },
  });
  const { data: doctorAppointments, isLoading } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor/appoinments");
      return response.data;
    },
  });
  if (isLoading && loadingDoctor) return null;
  const { name, _id, totalAppointments, totalEarnings, completed, cancelled } =
    doctor;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{name} Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Showing appointments for doctor #{_id}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {dashboardItem(
          <CgCalendar className="text-blue-500" />,
          "Total Appointments",
          totalAppointments,
        )}

        {dashboardItem(
          <LuIndianRupee className="text-green-500" />,
          "Total Earnings",
          `₹${totalEarnings}`,
        )}

        {dashboardItem(<FcBusiness />, "Completed", completed)}

        {dashboardItem(
          <BiCross className="text-red-500" />,
          "Cancelled",
          cancelled,
        )}
      </div>

      {/* Recent Appointments */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Appointments
        </h2>

        <button
          onClick={() => navigate("/doctor/appointments")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View All
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctorAppointments?.data?.slice(0, 3).map((item) => (
          <DoctorAppointmentCard key={item._id} {...item} />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/doctor/appointments")}
          className="px-8 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition"
        >
          Show More Appointments
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
