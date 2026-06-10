import React, { useEffect, useState } from "react";
import { DUMMY_APPOINTMENTS } from "../../DUMMY/DOCTOR";
import { Search } from "lucide-react";
import DoctorAppointmentCard from "../../components/doctor/DoctorAppointmentCard";
// 8.35
const DoctorAppointments = () => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(DUMMY_APPOINTMENTS);
   
  useEffect(() => {
    let data = DUMMY_APPOINTMENTS;

    if (status !== "all") {
      data = data.filter((item) => item.status === status);
    }
    if (search) {
      filter((appointment) => {
        return appointment.patient.name
          .split(" ")
          .some((val) => val.toLocaleLowerCase().startsWith(search));
      });
    }
    setFilteredSearch(data);
  }, [search, status]);
  // const handleSearch = (e) => {
  //   const term = e.target.value.trim().toLowerCase();
  //   setSearch(term);
  //   const updated = DUMMY_APPOINTMENTS.filter((appointment) => {
  //     return appointment.patient.name
  //       .split(" ")
  //       .some((val) => val.toLocaleLowerCase().startsWith(term));
  //   });
  //   setFilteredSearch(updated);
  // };
  // const handleFilterStatus = (e) => {
  //   const value = e.target.value;
  //   setStatus(value);
  //   if (status == "all") {
  //     setFilteredSearch(DUMMY_APPOINTMENTS);
  //     return;
  //   }
  //   const updated = DUMMY_APPOINTMENTS.filter((appointment) => {
  //     return appointment.status == status;
  //   });
  //   setFilteredSearch(updated);
  // };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Appointments</h1>
          <p className="text-gray-500 mt-1">
            Latest appointments first • Search by patient name
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-700 font-medium outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">ALL</option>
            <option value="confirmed">CONFIRMED</option>
            <option value="completed">COMPLETED</option>
            <option value="cancelled">CANCELLED</option>
            <option value="pending">PENDING</option>
          </select>
        </div>
      </div>

      {/* Appointments */}
      {filteredSearch.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSearch.map((item) => (
            <DoctorAppointmentCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
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

export default DoctorAppointments;
