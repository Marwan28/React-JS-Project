import { Link } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { Heart, User, Moon } from "lucide-react";
function GuestHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#fcfcfb] border-b border-[#eee] min-h-[60px]">
    <Logo />
    <Navbar />
    <div className="flex items-center gap-6">
      <Link
        to="/login"
        className="flex items-center gap-1 text-[#222] no-underline"
      >
        <Heart size={18} />
        <span>Sign In</span>
      </Link>
      <Link
        to="/signup"
        className="flex items-center gap-1 text-[#222] no-underline"
      >
        <User size={18} />
        <span>Sign Up</span>
      </Link>
      <Moon size={20} className="cursor-pointer" />
    </div>
  </header>
  );
}

export default GuestHeader;
