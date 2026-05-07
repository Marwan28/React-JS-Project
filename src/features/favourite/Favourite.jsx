import { useSelector } from "react-redux";
import FavouriteCard from "./FavouriteCard";

export default function Favourite() {
  const favouriteItems = useSelector((state) => state.favourite.items);
  const loading = useSelector((state) => state.favourite.loading);
  const error = useSelector((state) => state.favourite.error);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {/* Header */}
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200">
            <svg className="w-5 h-5 fill-gray-800" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22
                8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Favorite Properties</h1>
        </div>

        <p className="mb-8 text-gray-500 sm:ml-[52px]">
          {loading
            ? "Loading your saved properties..."
            : favouriteItems.length > 0
            ? `${favouriteItems.length} ${favouriteItems.length === 1 ? "property" : "properties"} saved to your favorites`
            : "No properties saved yet"}
        </p>

        {error && (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Grid or Empty */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : favouriteItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteItems.map((property) => (
              <FavouriteCard key={property.id} property={property} />
            ))}
          </div>
          
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center sm:py-28">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0
                  00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
            <p className="text-gray-400 max-w-xs">
              Browse properties and tap the heart icon to save them here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
