import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteLoading from "./RouteLoading";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <RouteLoading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
