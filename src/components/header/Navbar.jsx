import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Listings", href: "/listing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact_us" },
];

function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex gap-8 items-center">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`rounded-full px-3 py-2 transition no-underline decoration-none
              ${isActive
                ? "bg-[#23404a] text-white font-bold shadow-sm"
                : "text-gray-700 hover:bg-[#e6f0f3] hover:text-[#23404a]"}
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
