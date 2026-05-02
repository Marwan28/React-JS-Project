
import { useNavigate } from "react-router-dom";

export default function ReadyToFindHome() {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
        Ready to Find Your Perfect Home?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-xl">
        Join thousands of satisfied clients who found their dream properties
        with LuxeEstate
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/listing")}
          className="bg-[#1A2C3C] hover:bg-[#183D4B] text-white font-semibold px-8 py-3 rounded transition-colors text-lg shadow-sm"
        >
          Browse Listings
        </button>
        <button
          onClick={() => navigate("/contact_us")}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-[#183D4B] font-semibold px-8 py-3 rounded transition-colors text-lg shadow-sm"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
