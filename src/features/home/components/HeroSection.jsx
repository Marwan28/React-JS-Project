import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex min-h-[68vh] w-full items-center justify-center bg-cover bg-center px-4 py-16 text-center sm:min-h-[70vh]"
      style={{
        backgroundImage:
          "url('https://xqgwyvtctmprbhsvssdz.supabase.co/storage/v1/object/public/images/HomeSec.png')",
      }}
    >
      <div className="absolute inset-0 z-[1] bg-black/35" />
      <div className="relative z-[2] w-full max-w-5xl text-center text-white">
        <h1 className="mb-0 text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
          Find Your Dream
        </h1>
        <h2
          className="mb-4 mt-0 text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl"
          style={{ color: "#d6c7b2" }}
        >
          Luxury Property
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base sm:mb-10 sm:text-lg">
          Discover exceptional homes in the world's most desirable locations
        </p>
        <button
          onClick={() => navigate("/listing")}
          className="rounded-lg border-none bg-[#1A2C3C] px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#14506b] sm:px-10 sm:text-lg"
        >
          Explore
        </button>
      </div>
    </section>
  );
}
