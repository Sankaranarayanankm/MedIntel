import React, { useEffect, useState } from "react";
import { SERVICE_DASHBOARD, SERVICES } from "../../DUMMY/data";
import { Search } from "lucide-react";
import { BsBox, BsCheckCircle, BsXCircle, BsGraphUp } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const ServiceDashboard = () => {
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState(SERVICES);
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/services");
      return response?.data?.data;
    },
  });
  console.log(services);
  const { data: totalServices, isLoading: loadingTotalServices } = useQuery({
    queryKey: ["total-services"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/dashboard/services`);
      return response?.data?.data;
    },
  });
  const serviceItems = ({ icon, text, number, color }) => {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition">
        <div className={`text-2xl ${color}`}>{icon}</div>

        <div>
          <p className="text-gray-500 text-sm">{text}</p>
          <p className="text-xl font-bold text-gray-800">{number}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (services) {
      setFilteredServices(services);
    }
  }, [services]);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearch(term);
    const updated = SERVICES.filter((service) => {
      return service.name
        .split(" ")
        .some((val) => val.toLocaleLowerCase().startsWith(term));
    });
    setFilteredServices(updated);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-800">Service Dashboard</h4>
        <p className="text-gray-500">
          Overview of services, appointments and earnings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {serviceItems({
          icon: <BsBox />,
          text: "Total Services",
          number: totalServices.totalServices,
          color: "text-blue-600",
        })}

        {serviceItems({
          icon: <BsGraphUp />,
          text: "Total Revenue",
          number: totalServices.totalRevenue,
          color: "text-purple-600",
        })}

        {serviceItems({
          icon: <BsCheckCircle />,
          text: "Completed",
          number: totalServices.completedServices,
          color: "text-green-600",
        })}

        {serviceItems({
          icon: <BsXCircle />,
          text: "Cancelled",
          number: totalServices.cancelledServices,
          color: "text-red-600",
        })}
      </div>

      {/* Search */}
      <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3 mb-6">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => handleSearch(e)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Price</th>
              <th className="p-4">Appointments</th>
              <th className="p-4">Completed</th>
              <th className="p-4">Cancelled</th>
              <th className="p-4">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4 text-gray-600">₹{item.price}</td>
                <td className="p-4">{item.totalBookings}</td>
                <td className="p-4 text-green-600">{item.completedBookings}</td>
                <td className="p-4 text-red-600">{item.cancelledBookings}</td>
                <td className="p-4 font-semibold text-blue-600">
                  ₹{item.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceDashboard;
