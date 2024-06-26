import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  const roles = [localStorage.getItem("user_role")];
  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : access_token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
