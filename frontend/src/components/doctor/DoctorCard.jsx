import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = (props) => {
  const { image, name, specialization, experience } = props;
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
        onClick={() => navigate(`/patient/doctors/${props._id}`)}
        className="w-full mt-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default DoctorCard;
