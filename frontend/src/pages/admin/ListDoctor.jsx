import React, { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import AdminDoctorCard from "../../components/admin/DoctorCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";
import axios from "axios";
import toast from "react-hot-toast";

const ListDoctor = () => {
  const [filterDoctors, setFilterDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const { data: doctors, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await axiosInstance.get("admin/doctors");
      return response.data?.data;
    },
  });

  useEffect(() => {
    if (doctors) {
      setFilterDoctors(doctors);
    }
  }, [doctors]);

  //* Delete doctor
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async (id) => axiosInstance.delete(`/admin/doctors/${id}`),
    onSuccess: () => {
      toast.success("delted doctor successfully");
      queryclient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to delete doctor"),
  });

  const handleSearch = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearch(term);
    const updated = doctors.filter((doctor) => {
      return doctor.name
        .split(" ")
        .some((val) => val.toLocaleLowerCase().startsWith(term));
    });
    setFilterDoctors(updated);
  };
  const handleClearSearch = () => {
    setFilterDoctors(doctors);
    setSearch("");
  };
  const handleAvailabilityFilter = (availability) => {
    let updated;
    if (availability == "all") {
      updated = doctors;
    } else {
      updated = doctors?.filter((item) => item.availability === availability);
    }
    console.log(updated);
    console.log(availability);
    setFilterDoctors(updated);
  };
  if (doctorLoading) return null;
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <BsPeople size={24} />
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-800">Find a Doctor</h4>
              <p className="text-gray-500 text-sm">Search doctors by name</p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => handleAvailabilityFilter("all")}
          className="px-5 py-2.5 rounded-full border border-blue-500 bg-blue-500 text-white font-medium shadow-sm hover:shadow-md transition cursor-pointer"
        >
          All
        </button>

        <button
          onClick={() => handleAvailabilityFilter("available")}
          className="px-5 py-2.5 rounded-full border border-green-500 bg-green-500 text-white font-medium shadow-sm hover:shadow-md transition cursor-pointer"
        >
          Available
        </button>

        <button
          onClick={() => handleAvailabilityFilter("unavailable")}
          className="px-5 py-2.5 rounded-full border border-red-500 bg-red-500 text-white font-medium shadow-sm hover:shadow-md transition cursor-pointer"
        >
          Unavailable
        </button>
      </div>

      {/* Doctors Grid */}
      {filterDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-5 rounded-full">
              <BsPeople size={40} className="text-gray-400" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Doctors Found
          </h3>

          <p className="text-gray-500 mb-6">
            We couldn't find any doctors matching your search or filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setFilterDoctors(doctors);
            }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoctors.map((item) => (
            <AdminDoctorCard
              key={item._id}
              {...item}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListDoctor;
