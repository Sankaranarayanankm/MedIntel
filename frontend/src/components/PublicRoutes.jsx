import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ user }) => {
  const redirectMap = {
    admin: "/admin",
    doctor: "/doctor",
    patient: "/patient/doctors",
  };
  if (user) {
    return <Navigate to={redirectMap[user.role] || "/"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
