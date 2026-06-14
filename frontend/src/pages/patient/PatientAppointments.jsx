import React, { useEffect } from "react";
import PatientAppointmentCard from "../../components/patient/PatientAppointmentCard";
import PatientServiceCard from "../../components/patient/PatientServiceCard";
import { PATIENT_APPOINTMENTS, PATIENT_SERVICES } from "../../DUMMY/PATIENT";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utls/axios";

const PatientAppointments = () => {
  const { data: bookedAppointments, isLoading: loadingAppointments } = useQuery(
    {
      queryKey: ["booked-appointments"],
      queryFn: async () => {
        const response = await axiosInstance.get("/patient/appoinments");
        return response?.data?.data;
      },
    },
  );
  const { data: bookedServices, isLoading: loadingServices } = useQuery({
    queryKey: ["booked-services"],
    queryFn: async () => {
      const response = await axiosInstance.get("patient/services");
      return response?.data?.data;
    },
  });

  if (loadingAppointments && loadingServices) return null;
  // console.log(bookedServices);
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
          {bookedAppointments.map((item) => (
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
          {bookedServices.map((item) => (
            <PatientServiceCard key={item._id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientAppointments;
