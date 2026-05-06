import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import About from "./features/about/About";
import ContactUS from "./features/contact_us/ContactUS";
import Favourite from "./features/favourite/Favourite";
import Listing from "./features/Listing/Listing";
import Login from "./features/login/Login";
import Profile from "./features/profile/Profile";
import PropertyDetails from "./features/property_details/PropertyDetails";
import Header from "./components/header/Header";
import Home from "./features/home/Home";
import GuestHeader from "./components/header/GuestHeader";
import SignUp from "./features/signUp/SignUp";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import { useTheme } from "./theme/useTheme";
import { restoreAuthFromToken } from "./Redux/Reducer/authSlice";
import { loadFavouriteItems } from "./features/favourite/favouriteSlice";
import AddProperty from "./features/admin/AddProperty";
import AdminProperties from "./features/admin/AdminProperties";
import Dashboard from "./features/admin/Dashboard";
import NotFound from "./features/not_found/NotFound";
import Offline from "./features/offline/Offline";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const { theme, toggleTheme } = useTheme();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isSpecialPage = location.pathname === "/offline" ||
    ![ "/", "/about", "/contact_us", "/listing", "/favourite", "/profile", "/login", "/signup" ]
      .some((p) => location.pathname === p || location.pathname.startsWith("/listing/"));

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    dispatch(restoreAuthFromToken());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadFavouriteItems());
    }
  }, [authUserId, dispatch, isAuthenticated]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline && location.pathname !== "/offline") {
    return <Navigate to="/offline" replace />;
  }

  return (
    <>
      {!isAdminPage && !isSpecialPage && (
        isAuthenticated ? (
          <Header theme={theme} onToggleTheme={toggleTheme} />
        ) : (
          <GuestHeader theme={theme} onToggleTheme={toggleTheme} />
        )
      )}

      <Routes>
        <Route
          path="/"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route
          path="/about"
          element={
            <UserRoute>
              <About />
            </UserRoute>
          }
        />
        <Route
          path="/contact_us"
          element={
            <UserRoute>
              <ContactUS />
            </UserRoute>
          }
        />
        <Route
          path="/listing"
          element={
            <UserRoute>
              <Listing />
            </UserRoute>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <UserRoute>
              <PropertyDetails />
            </UserRoute>
          }
        />
        <Route
          path="/favourite"
          element={
            <UserRoute>
              <ProtectedRoute>
                <Favourite />
              </ProtectedRoute>
            </UserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </UserRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-property"
          element={
            <AdminRoute>
              <AddProperty />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <AdminRoute>
              <AdminProperties />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <NotFound />
            </AdminRoute>
          }
        />

        <Route path="/offline" element={<Offline />} />
        <Route
          path="*"
          element={
            <UserRoute>
              <NotFound />
            </UserRoute>
          }
        />
      </Routes>

      {!isAdminPage && !isSpecialPage && <Footer />}
    </>
  );
}

export default App;
