import { Link } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { LogIn, UserPlus } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
function GuestHeader({ theme, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#fcfcfb] border-b border-[#eee] min-h-[60px] transition-colors dark:bg-slate-950 dark:border-slate-800">
      <Logo />
      <Navbar />
      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="flex items-center gap-1 text-[#222] no-underline transition-colors hover:text-[#23404a] dark:text-slate-200 dark:hover:text-white"
        >
          <LogIn size={18} />
          <span>Sign In</span>
        </Link>
        <Link
          to="/signup"
          className="flex items-center gap-1 text-[#222] no-underline transition-colors hover:text-[#23404a] dark:text-slate-200 dark:hover:text-white"
        >
          <UserPlus size={18} />
          <span>Sign Up</span>
        </Link>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

export default GuestHeader;
