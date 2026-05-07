import { useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, Menu, User, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const favoriteCount = useSelector((state) => state.favourite.items.length);

  const closeMenu = () => setIsOpen(false);
  const favoriteLabel = `${favoriteCount} ${favoriteCount === 1 ? "favorite" : "favorites"}`;

  return (
    <header className="relative z-50 border-b border-[#eee] bg-[#fcfcfb] px-4 py-3 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="flex min-h-[48px] items-center justify-between gap-4">
        <Logo />

        <Navbar className="hidden lg:flex" />

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/favourite"
            className="flex items-center gap-1.5 text-[#222] no-underline transition-colors hover:text-[#23404a] dark:text-slate-200 dark:hover:text-white"
            aria-label={`Favorites, ${favoriteLabel}`}
          >
            <Heart size={18} />
            <span>Favorites</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#1A2C3C] px-2 py-0.5 text-xs font-bold leading-none text-white dark:bg-slate-100 dark:text-slate-950">
              {favoriteCount}
            </span>
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
              to="/favourite"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#222] no-underline transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={`Favorites, ${favoriteLabel}`}
            >
              <Heart size={16} />
              <span>Favorites</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#1A2C3C] px-1.5 py-0.5 text-[11px] font-bold leading-none text-white dark:bg-slate-100 dark:text-slate-950">
                {favoriteCount}
              </span>
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#222] no-underline transition-colors hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <User size={16} />
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
