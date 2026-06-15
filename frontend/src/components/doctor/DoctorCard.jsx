import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = (props) => {
  const { image, name, specialization, experience } = props;
  // console.log(props.availability);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-5">
      <img
        src={image}
        alt={name}
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
      />

      <h3 className="mt-4 text-xl font-semibold text-gray-800">{name}</h3>

      <p className="text-blue-600 font-medium">{specialization}</p>

      <p className="text-gray-500 mt-2">{experience} Years Experience</p>

      <button
        disabled={props.availability !== "available"}
        onClick={() => navigate(`/patient/doctors/${props._id}`)}
        className={`w-full mt-5 py-3 rounded-xl font-medium transition ${
          props.availability == "available"
            ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {props.availability ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
};

export default DoctorCard;
