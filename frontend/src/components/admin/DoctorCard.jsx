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
  //? we cannot pass function through navigate state, so getting doctor
  const { handleDelete, ...doctor } = props;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <img src={image} alt={name} className="w-full h-64 object-cover" />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h5 className="text-xl font-bold text-gray-800">{name}</h5>

            <p className="text-gray-500 mt-1">{specialization}</p>

            <p className="text-sm text-gray-400">
              {experience} Years Experience
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              availability === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {availability === "available" ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <Star size={18} fill="currentColor" className="text-yellow-500" />
          <span className="font-semibold text-gray-700">{rating}/5</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <BsPeople />
              Patients
            </div>

            <p className="text-lg font-bold text-gray-800 mt-1">{patients}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <IndianRupee size={14} />
              Fee
            </div>

            <p className="text-lg font-bold text-green-600 mt-1">₹{fee}</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="mt-4 bg-blue-50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Success Rate</span>

            <span className="text-lg font-bold text-blue-600">
              {successRate}%
            </span>
          </div>

          <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => props.handleDelete(props._id)}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer"
          >
            <Trash size={18} />
            Remove Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorCard;
