import Logo from "./Logo";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Heart, User, Moon } from "lucide-react";

const Header = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-[#fcfcfb] border-b border-[#eee] min-h-[60px]">
    <Logo />
    <Navbar />
    <div className="flex items-center gap-6">
      <Link
        to="/favourite"
        className="flex items-center gap-1 text-[#222] no-underline"
      >
        <Heart size={18} />
        <span>Favorites</span>
      </Link>
      <Link
        to="/profile"
        className="flex items-center gap-1 text-[#222] no-underline"
      >
        <User size={18} />
        <span>Profile</span>
      </Link>
      <Moon size={20} className="cursor-pointer" />
    </div>
  </header>
);

export default Header;
