import React from "react";
import { Calendar, Clock, CreditCard, UserRound } from "lucide-react";

const PatientAppointmentCard = (props) => {
  const { doctor, timeSlot, paymentMethod, status } = props;
  const [date, time] = timeSlot.split(" - ");
  // console.log(doctor?.image);
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300">
      <div className="flex  md:flex-row gap-5">
        {/* Doctor Image */}
        <div>
          <img
            src={doctor?.image}
            alt={doctor?.name}
            className="w-24 h-full object-cover border-4 border-blue-100"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {doctor?.name}
              </h3>

              <p className="text-blue-600 font-medium">
                {doctor?.qualification}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize w-fit ${
                statusColor[status]
              }`}
            >
              {status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-gray-600">
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

export default PatientAppointmentCard;
