import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { DOCTORS } from "../../DUMMY/data";
import DoctorCard from "../../components/doctor/DoctorCard";

const PatientDoctors = () => {
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(DOCTORS);
  const handleSearch = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearch(term);
    const updated = DOCTORS.filter((doctor) => {
      return doctor.name
        .split(" ")
        .some((val) => val.toLocaleLowerCase().startsWith(term));
    });
    setFilteredSearch(updated);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Our Medical Experts
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Find your ideal doctor by name
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <BiSearch
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search doctors by name..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Doctor Cards */}
      {filteredSearch.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSearch.map((item) => (
            <DoctorCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700">
            No Doctors Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try searching with a different name.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientDoctors;
