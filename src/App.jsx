import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "./features/admin/components/AdminSidebar";
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
import { useTheme } from "./theme/useTheme";
import { restoreAuthFromToken } from "./Redux/Reducer/authSlice";
import { loadFavouriteItems } from "./features/favourite/favouriteSlice";
import AddProperty from "./features/admin/AddProperty";
import Dashboard from "./features/admin/Dashboard";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const { theme, toggleTheme } = useTheme();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    dispatch(restoreAuthFromToken());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadFavouriteItems());
    }
  }, [authUserId, dispatch, isAuthenticated]);

  return (
    <>
      {isAdminPage && <AdminSidebar />}

      {!isAdminPage && (
        isAuthenticated ? (
          <Header theme={theme} onToggleTheme={toggleTheme} />
        ) : (
          <GuestHeader theme={theme} onToggleTheme={toggleTheme} />
        )
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact_us" element={<ContactUS />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<PropertyDetails />} />
        <Route
          path="/favourite"
          element={
            <ProtectedRoute>
              <Favourite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
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
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/properties" element={<properties />} />


        <Route path="/admin/add-property" element={<AddProperty />} />

        <Route path="/admin" element={<Dashboard />} />


      </Routes>
      {!isAdminPage && <Footer />}

    </>
  );
}

export default App;
