import React from "react";
import { BsClock, BsPerson, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IndianRupee } from "lucide-react";

const AdminAppointmentCard = (props) => {
  // console.log(appointment);
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

  const handleAdminCancel = (id) => {
    console.log(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <BsPerson />
          <span className="font-semibold">Doctor ID: {doctor}</span>
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

      {/* Time */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
        <BsClock />
        <span>{timeSlot}</span>
      </div>

      {/* Reason */}
      <p className="text-gray-700 text-sm mb-3">
        <span className="font-medium">Reason:</span> {reason}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1 text-green-600 font-semibold">
          <IndianRupee size={16} />
          {fee}
        </div>

        <div className="text-sm text-gray-500">
          Payment: <span className="font-medium">{paymentMethod}</span>
        </div>
      </div>

      {/* Cancel Info */}
      {adminCancel ? (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
          <BsXCircle />
          <span>Cancelled by Admin</span>
        </div>
      ) : (
        <button
          onClick={() => handleAdminCancel(props._id)}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition shadow-sm"
        >
          <BsXCircle />
          Admin Cancel
        </button>
      )}

      {/* Success badge */}
      {status === "completed" && (
        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
          <BsCheckCircle />
          <span>Appointment Completed</span>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentCard;
