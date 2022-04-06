import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../auth/authContext";

export const PublicRoute = ({ children, isLoggedIn }) => {
  //   const { user } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/" /> : children;
};
