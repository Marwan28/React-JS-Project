import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteLoading from "./RouteLoading";
import { isAdminUser } from "../utils/authRole";

export default function UserRoute({ children }) {
  const { isLoggedIn, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <RouteLoading />;
  }

  if (isLoggedIn && isAdminUser(user)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
