import React from "react";
import { BsClock, BsPerson, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IndianRupee } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utls/axios";

const AdminAppointmentCard = (props) => {
  const {
    doctor,
    patient,
    status,
    timeSlot,
    reason,
    fee,
    paymentMethod,
    adminCancel,
    cancelReason,
  } = props;
  // console.log(props._id);
  const queryClient = useQueryClient();
  const { mutate: handleAdminCancel, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.put(
        `/admin/appoinments/admin-cancel/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("cancelled this appointment");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to cancel"),
  });

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{doctor?.name}</h3>
          <p className="text-sm text-gray-500">Appointment ID: {props._id}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "completed"
              ? "bg-green-100 text-green-700"
              : status === "cancelled"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Appointment Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Patient</span>
            <span className="text-gray-800 font-semibold">{patient?.name}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Time Slot</span>
            <span className="flex items-center gap-2 text-gray-800 font-semibold">
              <BsClock />
              {timeSlot}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Payment Method</span>
            <span className="text-gray-800 font-semibold">{paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Consultation Fee</span>
            <span className="flex items-center gap-1 text-green-600 font-bold text-lg">
              <IndianRupee size={18} />
              {fee}
            </span>
          </div>
        </div>

        {/* Reason */}
        <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
            Appointment Reason
          </p>
          <p className="text-gray-700">{reason}</p>
        </div>

        {/* Status / Actions */}
        <div className="mt-5">
          {status === "completed" ? (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-xl border border-green-100">
              <BsCheckCircle />
              <span className="font-medium">Appointment Completed</span>
            </div>
          ) : status === "cancelled" || adminCancel ? (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-xl border border-red-100">
              <BsXCircle />
              <span className="font-medium">Appointment Cancelled</span>
            </div>
          ) : (
            <button
              onClick={() => handleAdminCancel(props._id)}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
            >
              <BsXCircle />
              Cancel Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentCard;
