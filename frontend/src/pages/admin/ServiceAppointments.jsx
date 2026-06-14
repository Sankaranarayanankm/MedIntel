import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DUMMY_SERVICE_APPOINTMENT } from "../../DUMMY/data";
import ServiceAppointmentCard from "../../components/admin/ServiceAppointmentCard";
import { useQueries, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const ServiceAppointments = () => {
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const { data: bookedServices, isLoading } = useQuery({
    queryKey: ["booked-services"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/user-services");
      return response?.data?.data;
    },
  });
  useEffect(() => {
    if (bookedServices) {
      setFilteredSearch(bookedServices);
    }
  }, [bookedServices]);
  // console.log(bookedServices);
  const handleSearch = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearch(term);
    const updated = DUMMY_SERVICE_APPOINTMENT.filter((appointment) => {
      return appointment.patient?.name
        ?.split(" ")
        .some((val) => val.toLowerCase().startsWith(term));
    });
    setFilteredSearch(updated);
  };
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage patient service bookings</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by patient name..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSearch.map((item, index) => (
          <ServiceAppointmentCard key={index} {...item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredSearch.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No appointments found
          </h3>
          <p className="text-gray-500 mt-2">
            Try searching with a different patient name.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceAppointments;
