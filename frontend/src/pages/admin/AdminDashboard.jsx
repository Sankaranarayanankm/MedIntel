import React, { useState } from "react";
import {
  BsBriefcase,
  BsCheck,
  BsCurrencyRupee,
  BsPeople,
  BsPerson,
  BsTicket,
} from "react-icons/bs";
import { FcCancel, FcSearch } from "react-icons/fc";
import {
  ADMIN_DASHBOARD_SERVICE,
  ADMIN_DOCTOR_DETAILS,
} from "../../DUMMY/data";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [filterDoctors, setFilteredDoctors] = useState(ADMIN_DOCTOR_DETAILS);
  const displayCard = (icon, text, number) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
        <div className="text-2xl text-blue-600">{icon}</div>

        <div>
          <p className="text-sm text-gray-500">{text}</p>
          <p className="text-2xl font-bold text-gray-800">{number}</p>
        </div>
      </div>
    );
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim();
    setSearch(searchTerm);
    console.log(searchTerm);
    const updated = ADMIN_DOCTOR_DETAILS.filter((doc) => {
      return doc.name
        .split(" ")
        .some((val) =>
          val.toLocaleLowerCase().startsWith(searchTerm.toLowerCase()),
        );
    });
    setFilteredDoctors(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-3xl font-bold text-gray-800">Dashboard</h4>
        <p className="text-gray-500">Overview of doctors & appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {displayCard(
          <BsPeople />,
          "Total Doctors",
          ADMIN_DASHBOARD_SERVICE.totalDoctors,
        )}
        {displayCard(
          <BsPerson />,
          "Total Patients",
          ADMIN_DASHBOARD_SERVICE.totalPatients,
        )}
        {displayCard(
          <BsBriefcase />,
          "Total Appointments",
          ADMIN_DASHBOARD_SERVICE.totalAppoinments,
        )}
        {displayCard(
          <BsCurrencyRupee />,
          "Total Revenue",
          ADMIN_DASHBOARD_SERVICE.totalRevenue,
        )}
        {displayCard(
          <BsCheck />,
          "Completed",
          ADMIN_DASHBOARD_SERVICE.totalCompletedAppoinments,
        )}
        {displayCard(
          <FcCancel />,
          "Cancelled",
          ADMIN_DASHBOARD_SERVICE.totalCancelledAppoinments,
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
        <p className="font-semibold text-gray-700 mb-3">Search Doctors</p>

        <div className="flex gap-3">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3">
            <FcSearch className="text-xl" />

            <input
              placeholder="Search doctor name..."
              value={search}
              onChange={(e) => handleSearch(e)}
              className="w-full p-3 outline-none"
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setFilteredDoctors(ADMIN_DOCTOR_DETAILS);
            }}
            className="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Specialization</th>
              <th className="px-6 py-4 text-left">Fee</th>
              <th className="px-6 py-4 text-left">Appointments</th>
              <th className="px-6 py-4 text-left">Completed</th>
              <th className="px-6 py-4 text-left">Cancelled</th>
              <th className="px-6 py-4 text-left">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {filterDoctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{doctor.name}</td>

                <td className="px-6 py-4">{doctor.specialization}</td>

                <td className="px-6 py-4">₹{doctor.fee}</td>

                <td className="px-6 py-4">{doctor.totalAppoinments}</td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  {doctor.completedAppoinments}
                </td>

                <td className="px-6 py-4 text-red-600 font-semibold">
                  {doctor.cancelledAppoinments}
                </td>

                <td className="px-6 py-4 font-bold text-blue-600">
                  ₹{doctor.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
