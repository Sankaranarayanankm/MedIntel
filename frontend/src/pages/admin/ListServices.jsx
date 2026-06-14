import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import AdminServiceCard from "../../components/admin/AdminServiceCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const ListServices = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const handleSearch = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearch(term);
    const updated = services?.filter((service) => {
      return service.name
        .split(" ")
        .some((val) => val.toLocaleLowerCase().startsWith(term));
    });
    setFilteredSearch(updated);
  };
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/services");
      return response?.data?.data;
    },
  });
  useEffect(() => {
    const updated = services?.filter((item) =>
      activeFilter == "all" ? item : item.availability == activeFilter,
    );
    console.log(updated);
    setFilteredSearch(updated);
  }, [activeFilter]);
  useEffect(() => {
    if (services) {
      setFilteredSearch(services);
    }
  }, [services]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h4 className="text-3xl font-bold text-gray-800">Services</h4>

            <p className="text-gray-500 mt-1">
              Manage your services, edit, schedule or remove
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Filters */}
            <div className="flex gap-2">
              <span
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </span>

              <span
                onClick={() => setActiveFilter("available")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                  activeFilter === "available"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Available
              </span>

              <span
                onClick={() => setActiveFilter("unavailable")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                  activeFilter === "unavailable"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Unavailable
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                placeholder="Search services..."
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-72 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredSearch?.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-md">
          <div className="text-6xl mb-4">🔍</div>

          <h3 className="text-2xl font-bold text-gray-800">
            No Services Found
          </h3>

          <p className="text-gray-500 mt-2 text-center max-w-md">
            We couldn't find any services matching your search. Try a different
            keyword or clear the search filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSearch?.map((service) => {
            return <AdminServiceCard key={service._id} {...service} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ListServices;
