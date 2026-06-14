import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IndianRupee, Phone, User, Watch } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../utls/axios";
import toast from "react-hot-toast";

const ServiceAppointmentCard = (props) => {
  const { patient, fee, service, status, timeSlot, _id } = props;
  const [statusValue, setStatusValue] = useState(status);
  const [date, time] = timeSlot?.split(" - ");
  // console.log(_id);
  const queryClient = useQueryClient();
  const { mutate: adminCancelService, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.put(
        `/admin/user-services/admin-cancel/${id}`,
      );
    },
    onSuccess: () => {
      toast.success("cancelled by admin");
      queryClient.invalidateQueries({ queryKey: ["booked-services"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "failed to cancel"),
  });
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="text-blue-600" size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {patient.name}
            </h3>

            <p className="text-sm text-gray-500 capitalize">{patient.gender}</p>
          </div>
        </div>

        {status === "pending" && (
          <button
            onClick={() => adminCancelService(_id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
          >
            Admin Cancel
          </button>
        )}
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={18} className="text-gray-500" />
          <span>{patient.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <IndianRupee size={18} className="text-green-600" />
          <span className="font-medium">{fee}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Watch size={18} className="text-gray-500" />
          <span>
            <strong>Date:</strong> {date}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Watch size={18} className="text-gray-500" />
          <span>
            <strong>Time:</strong> {time}
          </span>
        </div>
      </div>

      {/* Service */}
      <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Service
          </p>
          <p className="font-medium text-gray-800">{service.name}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusValue === "completed"
              ? "bg-green-100 text-green-700"
              : statusValue === "confirmed"
                ? "bg-blue-100 text-blue-700"
                : statusValue === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {statusValue}
        </span>
      </div>
    </div>
  );
};

export default ServiceAppointmentCard;
