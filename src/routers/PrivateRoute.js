import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../auth/authContext";

export const PrivateRoute = ({ children, isLoggedIn }) => {
  //   const { user } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/auth/login" />;
};
