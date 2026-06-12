import "./App.css";
import AdminLogin from "./pages/admin/AdminLogin";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import PatientLogin from "./pages/patient/PatientLogin";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PatientSignup from "./pages/patient/PatientSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import ListDoctor from "./pages/admin/ListDoctor";
import Appointments from "./pages/admin/Appointments";
import ServiceDashboard from "./pages/admin/ServiceDashboard";
import AddService from "./pages/admin/AddService";
import ListServices from "./pages/admin/ListServices";
import ServiceAppointments from "./pages/admin/ServiceAppointments";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientServices from "./pages/patient/PatientServices";
import PatientDoctorDetails from "./pages/patient/PatientDoctorDetails";
import PatientDoctors from "./pages/patient/PatientDoctors";
import PatientServiceDetails from "./pages/patient/PatientServiceDetails";
import { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./utls/axios";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => {
      const localData = localStorage.getItem("user");
      return localData ? JSON.parse(localData) : null;
    },
  });
  const role = user?.role || "";
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/signup" element={<PatientSignup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/patient">
            <Route path="login" element={<PatientLogin />} />
            <Route path="signup" element={<PatientSignup />} />
            <Route path="doctors" element={<PatientDoctors />} />
            <Route
              path="doctors/:doctorId"
              element={<PatientDoctorDetails />}
            />
            <Route path="services" element={<PatientServices />} />
            <Route
              path="services/:serviceId"
              element={<PatientServiceDetails />}
            />
            <Route path="appointments" element={<PatientAppointments />} />
          </Route>
          <Route path="/doctor">
            <Route path="login" element={<DoctorLogin />} />
            <Route path="" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="profile" element={<DoctorProfile />} />
          </Route>
          <Route path="/admin">
            <Route path="" element={<AdminDashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="doctors" element={<ListDoctor />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="service-dashboard" element={<ServiceDashboard />} />
            <Route path="add-service" element={<AddService />} />
            <Route path="services" element={<ListServices />} />
            <Route
              path="service-appointments"
              element={<ServiceAppointments />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
