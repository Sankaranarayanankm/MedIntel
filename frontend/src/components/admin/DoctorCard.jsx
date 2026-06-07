import { IndianRupee, Pencil, Star, Trash } from "lucide-react";
import React from "react";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminDoctorCard = (props) => {
  const navigate = useNavigate();
  const {
    image,
    name,
    availability,
    experience,
    fee,
    rating,
    specialization,
    successRate,
    patients,
  } = props;
  // console.log(props);

  const deleteHandler = (name, availablity) => {
    console.log(name, availablity);
  };
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img src={image} alt={name} className="w-full h-64 object-cover" />

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h5 className="text-xl font-bold text-gray-800">{name}</h5>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              availability == "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {availability == "available" ? "available" : "unavailable"}
          </span>
        </div>

        <p className="text-gray-500 mt-2">
          {specialization} • {experience} Years Experience
        </p>

        <div className="flex items-center gap-1 mt-3 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span className="font-medium text-gray-700">{rating}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BsPeople />
            <span>{patients} Patients</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-green-600">
            <IndianRupee size={16} />
            {fee}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Success Rate:
            <span className="font-semibold text-blue-600 ml-1">
              {successRate}%
            </span>
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => deleteHandler(name)}
            className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Trash size={18} />
            Delete Doctor
          </button>

          <button
            onClick={() =>
              navigate("/admin/add-doctor", { state: { doctor: props } })
            }
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <Pencil size={18} />
            Edit Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorCard;
