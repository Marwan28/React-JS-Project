import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://xqgwyvtctmprbhsvssdz.supabase.co/storage/v1/object/public/images/HomeSec.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/35 z-1" />
      <div className="relative z-2 text-center text-white w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-0">
          Find Your Dream
        </h1>
        <h2
          className="text-5xl md:text-7xl font-extrabold leading-tight mt-0 mb-4"
          style={{ color: "#d6c7b2" }}
        >
          Luxury Property
        </h2>
        <p className="text-lg mb-10">
          Discover exceptional homes in the world's most desirable locations
        </p>
        <button
          onClick={() => navigate("/listing")}
          className="px-10 py-3 text-lg font-semibold rounded-lg border-none bg-[#1A2C3C] text-white cursor-pointer shadow-md hover:bg-[#14506b] transition-colors"
        >
          Explore
        </button>
      </div>
    </section>
  );
}
