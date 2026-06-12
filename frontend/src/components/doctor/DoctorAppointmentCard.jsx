import React, { useEffect, useState } from "react";
import { User, Phone, Stethoscope, Calendar, IndianRupee } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const DoctorAppointmentCard = ({
  patient,
  status,
  timeSlot,
  reason,
  paymentMethod,
  fee,
  _id,
}) => {
  const [date, time] = timeSlot.split(" - ");
  const [editStatus, setEditStatus] = useState("pending");
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      console.log(id);
      console.log(status);
      const response = await axiosInstance.put(`doctor/appoinments/${id}`, {
        status,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["doctor"],
      });
    },
  });
  const handleStatusUpdate = (e) => {
    setEditStatus(e.target.value);
    updateStatus({
      id: _id,
      status: e.target.value,
    });
  };
  useEffect(() => {
    if (status) {
      setEditStatus(status);
    }
  }, []);
  console.log(status);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all">
      {/* Patient */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User size={20} className="text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">{patient.name}</h3>

            <p className="text-sm text-gray-500 capitalize">{patient.gender}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "completed"
              ? "bg-green-100 text-green-700"
              : status === "confirmed"
                ? "bg-blue-100 text-blue-700"
                : status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={16} />
          <span>{patient.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={16} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={16} />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Stethoscope size={16} />
          <span>{reason}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <IndianRupee size={16} />
          <span>{fee}</span>
        </div>
      </div>
      {status !== "cancelled" && status !== "completed" ? (
        <select
          value={editStatus}
          onChange={(e) => handleStatusUpdate(e)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ) : (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      )}
    </div>
  );
};

export default DoctorAppointmentCard;
