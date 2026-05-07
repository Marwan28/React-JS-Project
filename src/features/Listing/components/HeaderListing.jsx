const ListingHeader = ({ title = "Explore Luxury Properties", count = 10 }) => {
  return (
    <section className="bg-[#1A2C3C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20">
        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
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
