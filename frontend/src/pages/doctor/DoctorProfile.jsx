import React, { useState } from "react";
import { DOCTOR } from "../../DUMMY/DOCTOR";
import { BsCheck, BsPerson } from "react-icons/bs";
import { IndianRupee, Star } from "lucide-react";
import DoctorProfileForm from "../../components/doctor/DoctorProfileForm";

const DoctorProfile = () => {
  const [availability, setAvailability] = useState("available");

  const doctorProfileItem = ({ icon, text, number }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-3 text-blue-600">{icon}</div>

        <p className="text-sm text-gray-500">{text}</p>

        <p className="text-2xl font-bold text-gray-800 mt-1">{number}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Doctor Header */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32" />

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 -mt-16">
            <img
              src={DOCTOR.image}
              alt={DOCTOR.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {DOCTOR.name}
              </h1>

              <p className="text-blue-600 font-medium mt-1">
                {DOCTOR.specialization}
              </p>

              <p className="text-gray-500 mt-2">{DOCTOR.qualification}</p>
            </div>

            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  availability === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {availability}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {doctorProfileItem({
          icon: <BsPerson />,
          text: "Patients",
          number: "23K",
        })}

        {doctorProfileItem({
          icon: <BsCheck />,
          text: "Success Rate",
          number: "98%",
        })}

        {doctorProfileItem({
          icon: <Star />,
          text: "Rating",
          number: "4.8",
        })}

        {doctorProfileItem({
          icon: <IndianRupee />,
          text: "Consultation Fee",
          number: `₹${DOCTOR.fee}`,
        })}
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

        <DoctorProfileForm />
      </div>
    </div>
  );
};

export default DoctorProfile;
