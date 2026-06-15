import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ADMIN_NAVBAR, DOCTOR_NAVBAR, PATIENT_NAVBAR } from "../DUMMY/data";

import LoadingScreen from "../components/LoadingScreen";

const AppLayout = ({ user, services }) => {
  const navbarItems =
    user?.role == "admin"
      ? ADMIN_NAVBAR
      : user?.role == "doctor"
        ? DOCTOR_NAVBAR
        : PATIENT_NAVBAR;

  return (
    <div>
      <Navbar navbarItems={navbarItems} role={user?.role} />
      <Outlet />

      <Footer role={user?.role} services={services} />
    </div>
  );
};

export default AppLayout;
