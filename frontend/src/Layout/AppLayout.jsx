import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ADMIN_NAVBAR, DOCTOR_NAVBAR, PATIENT_NAVBAR } from "../DUMMY/data";

const AppLayout = ({ user }) => {
  // console.log(user.role);
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
      <Footer />
    </div>
  );
};

export default AppLayout;
