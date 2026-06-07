import React from "react";
import { PATIENT_SERVICES } from "../../DUMMY/PATIENT";
import ServiceCard from "../../components/patient/ServiceCard";

const PatientServices = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Our Diagnostic Services
        </h2>

        <p className="text-gray-500 text-lg">
          Safe, Accurate and Reliable Testing
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PATIENT_SERVICES.map((service) => (
          <ServiceCard key={service._id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default PatientServices;
