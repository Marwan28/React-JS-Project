import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Listings", href: "/listing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact_us" },
];

function Navbar({ className = "", linkClassName = "", onNavigate }) {
  const location = useLocation();
  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={`rounded-full px-3 py-2 transition no-underline decoration-none ${linkClassName}
              ${isActive
                ? "bg-[#1A2C3C] text-white font-bold shadow-sm dark:bg-slate-100 dark:text-slate-950"
                : "text-gray-700 hover:bg-[#e6f0f3] hover:text-[#23404a] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
