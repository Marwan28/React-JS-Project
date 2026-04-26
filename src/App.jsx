import { Routes, Route } from "react-router-dom";
import About from "./features/about/About";
import ContactUS from "./features/contact_us/ContactUS";
import Favourite from "./features/favourite/Favourite";
import Home from "./features/home/Home";
import Listing from "./features/Listing/Listing";
import Login from "./features/login/Login";
import Profile from "./features/profile/Profile";
import SignIn from "./features/signIn/SignIn";
import PropertyDetails from "./features/property_details/PropertyDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUS />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
