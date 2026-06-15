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
    const updated = doctors.filter(
      (item) => item.availability === availability,
    );
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
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium cursor-pointer">
          Available
        </button>

        <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium cursor-pointer">
          Unavailable
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoctors.map((item) => (
          <AdminDoctorCard
            key={item._id}
            {...item}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ListDoctor;
