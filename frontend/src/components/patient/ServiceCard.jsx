import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = (props) => {
  const { service } = props;
  const navigate = useNavigate();
  console.log(props);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <img src={service.image} alt={service.name} className="w-full h-48 " />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
          {service.name}
        </h3>

        <button
          onClick={() => navigate(`/patient/services/${props._id}`)}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
