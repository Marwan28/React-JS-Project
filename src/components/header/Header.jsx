import Logo from "./Logo";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Heart, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ theme, onToggleTheme }) => (
  <header className="flex items-center justify-between px-8 py-4 bg-[#fcfcfb] border-b border-[#eee] min-h-[60px] transition-colors dark:bg-slate-950 dark:border-slate-800">
    <Logo />
    <Navbar />
    <div className="flex items-center gap-6">
      <Link
        to="/favourite"
        className="flex items-center gap-1 text-[#222] no-underline transition-colors hover:text-[#23404a] dark:text-slate-200 dark:hover:text-white"
      >
        <Heart size={18} />
        <span>Favorites</span>
      </Link>
      <Link
        to="/profile"
        className="flex items-center gap-1 text-[#222] no-underline transition-colors hover:text-[#23404a] dark:text-slate-200 dark:hover:text-white"
      >
        <User size={18} />
        <span>Profile</span>
      </Link>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </header>
);

export default Header;
