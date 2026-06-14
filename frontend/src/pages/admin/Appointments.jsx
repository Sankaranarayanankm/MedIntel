import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import AdminAppointmentCard from "../../components/admin/AdminAppointmentCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const handleSearch = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearch(term);
    const updated = appointments?.filter((appointment) => {
      return appointment?.doctor?.name
        .split(" ")
        .some((val) => val.toLowerCase().startsWith(term));
    });
    console.log(updated);
    setFilteredAppointments(updated);
  };
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/appoinments");
      return response?.data?.data;
    },
  });
  useEffect(() => {
    if (appointments) {
      setFilteredAppointments(appointments);
    }
  }, [appointments]);
  if (isLoading) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Title */}
        <div>
          <h4 className="text-2xl font-bold text-gray-800">Appointments</h4>
          <p className="text-gray-500 text-sm mt-1">
            Manage and search upcoming patient appointments
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-full md:w-80 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="text-gray-500" size={18} />

          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent w-full outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <AdminAppointmentCard key={appointment._id} {...appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
