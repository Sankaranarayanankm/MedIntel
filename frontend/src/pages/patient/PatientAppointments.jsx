import React from "react";
import PatientAppointmentCard from "../../components/patient/PatientAppointmentCard";
import PatientServiceCard from "../../components/patient/PatientServiceCard";
import { PATIENT_APPOINTMENTS, PATIENT_SERVICES } from "../../DUMMY/PATIENT";

const PatientAppointments = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Doctor Appointments */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Doctor Appointments
          </h2>
          <p className="text-gray-500 mt-1">
            View and manage your doctor consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PATIENT_APPOINTMENTS.map((item) => (
            <PatientAppointmentCard key={item._id} {...item} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Booked Services
          </h2>
          <p className="text-gray-500 mt-1">
            Track your lab tests, scans, vaccinations, and other healthcare
            services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PATIENT_SERVICES.map((item) => (
            <PatientServiceCard key={item._id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientAppointments;
