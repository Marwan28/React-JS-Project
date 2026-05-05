export default function MapPlaceholder() {
  const latitude = 30.0444;
  const longitude = 31.2357;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      <div className="min-w-[280px] flex-1">
        <div className="rounded-3xl overflow-hidden h-[300px] shadow-md border border-gray-100">
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noreferrer"
            className="block w-full h-full"
          >
            <iframe
              title="Google Map"
              className="w-full h-full border-0 pointer-events-none"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
              allowFullScreen
            />
          </a>
        </div>
      </div>
    </div>
  );
}