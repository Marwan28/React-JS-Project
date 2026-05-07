import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { LogIn, Menu, UserPlus, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
function GuestHeader({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-50 border-b border-[#eee] bg-[#fcfcfb] px-4 py-3 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="flex min-h-[48px] items-center justify-between gap-4">
        <Logo />

        <Navbar className="hidden lg:flex" />

        <div className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-slate-700 transition hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 bg-[#fcfcfb] p-4 shadow-lg dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <Navbar
            className="flex-col items-stretch gap-1"
            linkClassName="block rounded-lg"
            onNavigate={closeMenu}
          />
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-200 pt-3 dark:border-slate-800">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#222] no-underline transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <LogIn size={16} />
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1A2C3C] px-3 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#14506b] dark:bg-slate-100 dark:text-slate-950"
            >
              <UserPlus size={16} />
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default GuestHeader;
