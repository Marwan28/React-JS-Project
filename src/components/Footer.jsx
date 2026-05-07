import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.75 1.27 4 4 0 0 1 7.75-1.27z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.63 0-4.6 2.45-4 5A12.94 12.94 0 0 1 1.64 1s-4 9 5 13a13.07 13.07 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = ["Home", "Browse Listings", "About Us", "Contact"];
const propertyTypes = [
  "Luxury Villas",
  "Modern Apartments",
  "Family Houses",
  "Penthouses",
];
const socialIcons = [FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon];
const contactItems = [
  {
    icon: <MapPin size={16} />,
    text: "123 Luxury Avenue, Beverly Hills, CA 90210",
  },
  { icon: <Phone size={16} />, text: "+1 (555) 123-4567" },
  { icon: <Mail size={16} />, text: "info@luxeestate.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 pb-8 pt-12 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-5 lg:pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.2fr]">
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2d3d] font-bold text-white">
              L
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              LuxeEstate
            </span>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-slate-400">
            Your premium destination for luxury real estate. Find your dream
            property with our curated collection of high-end homes.
          </p>

          <div className="flex gap-2.5">
            {socialIcons.map((Icon, index) => (
              <button
                key={index}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#1a2d3d] hover:text-[#1a2d3d] dark:border-slate-700 dark:text-slate-400 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                aria-label="Social link"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
            Quick Links
          </h4>
          {footerLinks.map((link) => (
            <p
              key={link}
              className="mb-2.5 cursor-pointer text-sm text-gray-500 transition hover:text-[#1a2d3d] dark:text-slate-400 dark:hover:text-cyan-300"
            >
              {link}
            </p>
          ))}
        </div>

        <div>
          <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
            Property Types
          </h4>
          {propertyTypes.map((type) => (
            <p
              key={type}
              className="mb-2.5 cursor-pointer text-sm text-gray-500 transition hover:text-[#1a2d3d] dark:text-slate-400 dark:hover:text-cyan-300"
            >
              {type}
            </p>
          ))}
        </div>

        <div>
          <h4 className="mb-4 font-bold text-slate-900 dark:text-white">
            Contact Info
          </h4>
          {contactItems.map((item) => (
            <div
              key={item.text}
              className="mb-3 flex items-start gap-2.5 text-gray-500 dark:text-slate-400"
            >
              {item.icon}
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-gray-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400 dark:text-slate-500">
          © 2026 LuxeEstate. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span className="cursor-pointer text-sm text-gray-400 transition hover:text-[#1a2d3d] dark:text-slate-500 dark:hover:text-cyan-300">
            Privacy Policy
          </span>
          <span className="cursor-pointer text-sm text-gray-400 transition hover:text-[#1a2d3d] dark:text-slate-500 dark:hover:text-cyan-300">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
