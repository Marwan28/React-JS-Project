import { Routes, Route } from "react-router-dom";
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


const isAuthenticated = false; // Set to true if user is logged in

function App() {
  return (
    <>
      {isAuthenticated ? <Header /> : <GuestHeader />}
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
    </>
  );
}

export default App;
