import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { useTheme } from "./theme/useTheme";
import { restoreAuthFromToken } from "./Redux/Reducer/authSlice";
import { loadFavouriteItems } from "./features/favourite/favouriteSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const { theme, toggleTheme } = useTheme();

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
      {isAuthenticated ? (
        <Header theme={theme} onToggleTheme={toggleTheme} />
      ) : (
        <GuestHeader theme={theme} onToggleTheme={toggleTheme} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact_us" element={<ContactUS />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
