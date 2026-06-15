import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ADMIN_NAVBAR, DOCTOR_NAVBAR, PATIENT_NAVBAR } from "../DUMMY/data";
import { useIsFetching } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";

const AppLayout = ({ user }) => {
  // console.log(user.role);
  const isFetching = useIsFetching();

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
       {/**
        * usefetching constantly checks for requrest
        * and 0 means no request so loading screen if there is one more requestss
        */}

      {isFetching > 0 && ( 
        <div className="fixed inset-0 z-50">
          <LoadingScreen />
        </div>
      )}
      <Footer role={user?.role} />
    </div>
  );
};

export default AppLayout;
