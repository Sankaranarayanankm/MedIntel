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
import { useContext, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoutes";
import PatientProfile from "./pages/PatientProfile ";
import ErrorPage from "./pages/ErrorPage";
import LoadingScreen from "./components/LoadingScreen";
import { AuthContext } from "./context/AuthContextProvider";

const App = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const resposne = await axiosInstance.get("admin/services");
      return resposne.data?.data;
    },
  });
  if (isLoading) {
    return <LoadingScreen />;
  }
  // console.log(user);

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<AppLayout user={user} services={services} />}>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route element={<PublicRoute user={user} />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/patient/signup" element={<PatientSignup />} />
          </Route>
          <Route path="/patient">
            <Route path="doctors" element={<PatientDoctors />} />
            <Route
              path="doctors/:doctorId"
              element={<PatientDoctorDetails user={user} />}
            />
            <Route path="services" element={<PatientServices />} />
            <Route
              path="services/:serviceId"
              element={<PatientServiceDetails user={user} />}
            />
            <Route
              element={<ProtectRoute user={user} allowedRoute="patient" />}
            >
              <Route path="" element={<PatientProfile />} />

              <Route path="appointments" element={<PatientAppointments />} />
            </Route>
          </Route>
          <Route element={<ProtectRoute user={user} allowedRoute="doctor" />}>
            <Route path="/doctor">
              {/* <Route path="login" element={<DoctorLogin />} /> */}
              <Route path="" element={<DoctorDashboard />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
          </Route>
          <Route element={<ProtectRoute user={user} allowedRoute="admin" />}>
            <Route path="/admin">
              <Route path="" element={<AdminDashboard />} />
              {/* <Route path="login" element={<AdminLogin />} /> */}
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
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
