import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteLoading from "./RouteLoading";
import { isAdminUser } from "../utils/authRole";

export default function AdminRoute({ children }) {
  const { isLoggedIn, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <RouteLoading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
