import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../favourite/favouriteSlice";
import { MapPin, Share2, Heart, Bed, Bath, Maximize } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyInfo = ({ property }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favourite.items);
  const pendingIds = useSelector((state) => state.favourite.pendingIds);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isFavorite = favorites.find((item) => item.id === property.id);
  const isFavoritePending = pendingIds.includes(property.id);

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        await dispatch(removeFromFavourite(property.id)).unwrap();
      } else {
        await dispatch(addToFavourite(property)).unwrap();
      }
    } catch (error) {
      console.error("Favorite update failed:", error);
    }
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:rounded-[2.5rem]">
      <div className="border-b border-gray-50 p-5 sm:p-8 lg:p-10">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                Villa
              </span>
              <span className="px-3 py-1 bg-taupe-300 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                For Sale
              </span>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
                <Share2 size={18} className="text-gray-600" />
              </button>
              <button
                disabled={isFavoritePending}
                onClick={toggleFavorite}
                className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  size={18}
                  className={` transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            {property.title}
          </h1>
          <p className="flex items-start text-base font-medium text-gray-400 sm:items-center sm:text-lg">
            <MapPin size={24} className="mr-2 shrink-0 text-gray-500" />{" "}
            {property.address}, {property.city}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-gray-50 bg-gray-50/10 p-5 sm:grid-cols-3 sm:p-8 lg:px-12">
        <div className="text-center group">
          <Bed className="mx-auto text-gray-500 mb-2" size={32} />
          <p className="text-xs text-gray-400 font-bold uppercase">Bedrooms</p>
          <p className="font-black text-2xl">{property.bedrooms}</p>
        </div>
        <div className="text-center group">
          <Bath className="mx-auto text-gray-500 mb-2" size={32} />
          <p className="text-xs text-gray-400 font-bold uppercase">Bathrooms</p>
          <p className="font-black text-2xl">{property.bathrooms}</p>
        </div>
        <div className="text-center group">
          <Maximize className="mx-auto text-gray-500 mb-2" size={32} />
          <p className="text-xs text-gray-400 font-bold uppercase">Area</p>
          <p className="font-black text-2xl">
            {property.area} <span className="text-sm font-normal">sq ft</span>
          </p>
        </div>
      </div>

      <div className="border-b border-gray-50 p-5 sm:p-8 lg:p-10">
        <h2 className="mb-4 text-2xl font-black text-gray-900 dark:text-white sm:mb-6">Description</h2>
        <p className="text-base font-medium italic leading-relaxed text-gray-500 sm:text-lg">
          {property.description}
        </p>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        <h2 className="mb-6 text-2xl font-black text-gray-900 dark:text-white sm:mb-10">
          Features & Amenities
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Smart Home System",
            "Wine Cellar",
            "Swimming Pool",
            "Security System",
            "Hardwood Floors",
            "Walk-in Closets",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center text-gray-600 font-bold text-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#23404a] mr-3"></div>{" "}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
