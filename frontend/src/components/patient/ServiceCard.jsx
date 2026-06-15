import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = (props) => {
  const { image, name } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <img src={image} alt={name} className="w-full h-48 " />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
          {name}
        </h3>
        <button
          disabled={props.availability !== "available"}
          onClick={() => navigate(`/patient/services/${props._id}`)}
          className={`w-full py-2.5 rounded-xl font-medium transition ${
            props.availability == "available"
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {props.availability ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
