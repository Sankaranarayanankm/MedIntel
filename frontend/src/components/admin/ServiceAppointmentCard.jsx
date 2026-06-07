import { IndianRupee, Phone, User, Watch } from "lucide-react";
import React, { useState } from "react";

const ServiceAppointmentCard = (props) => {
  const { patient, fee, service, status, timeSlot } = props;
  const [statusValue, setStatusValue] = useState(status);
  console.log(timeSlot);
  const [date, time] = timeSlot?.split(" - ");

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

            <p className="text-sm text-gray-500 capitalize">
              {patient.gender} • {patient.age} yrs
            </p>
          </div>
        </div>

        <select
          disabled={status === "completed" || status === "cancelled"}
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
          <p className="font-medium text-gray-800">{service}</p>
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
