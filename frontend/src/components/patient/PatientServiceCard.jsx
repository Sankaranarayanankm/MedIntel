import React from "react";
import { Calendar, Clock, CreditCard, IndianRupee } from "lucide-react";

const PatientServiceCard = (props) => {
  const { service, timeSlot, fee, status, paymentMethod } = props;

  const [date, time] = timeSlot.split(" - ");

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
      <div className="flex  md:flex-row gap-5">
        {/* Service Image */}
        <img
          src={service.image}
          alt={service.name}
          className="w-24 rounded-xl object-cover"
        />

        {/* Service Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {service.name}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-gray-600">
                <IndianRupee size={16} />
                <span>{fee}</span>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                statusColors[status]
              }`}
            >
              {status}
            </span>
          </div>

          <div className="mt-4 gap-3 flex flex-wrap text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard size={18} />
              <span className="capitalize">{paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientServiceCard;
