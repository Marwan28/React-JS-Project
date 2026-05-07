
import { useNavigate } from "react-router-dom";

export default function ReadyToFindHome() {
  const navigate = useNavigate();
  return (
    <section className="flex w-full flex-col items-center justify-center px-4 py-14 sm:px-6 sm:py-16">
      <h2 className="mb-4 text-center text-2xl font-extrabold sm:text-3xl md:text-4xl">
        Ready to Find Your Perfect Home?
      </h2>
      <p className="mb-8 max-w-xl text-center text-gray-500">
        Join thousands of satisfied clients who found their dream properties
        with LuxeEstate
      </p>
      <div className="flex w-full max-w-md flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row">
        <button
          onClick={() => navigate("/listing")}
          className="rounded bg-[#1A2C3C] px-8 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-[#183D4B]"
        >
          Browse Listings
        </button>
        <button
          onClick={() => navigate("/contact_us")}
          className="rounded border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-[#183D4B] shadow-sm transition-colors hover:bg-gray-50"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
