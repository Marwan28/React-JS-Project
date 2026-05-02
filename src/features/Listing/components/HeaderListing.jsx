const ListingHeader = ({ title = "Explore Luxury Properties", count = 10 }) => {
  return (
    <section className="bg-[#1A2C3C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/80">
          {count} exceptional properties available
        </p>
      </div>
    </section>
  );
};

export default ListingHeader;
