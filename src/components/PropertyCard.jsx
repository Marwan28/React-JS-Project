import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import {
  addToFavourite,
  removeFromFavourite,
} from "../features/favourite/favouriteSlice";
import CardImage from "./CardImage";

function PropertyCard({ property, className = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourite.items);
  const pendingIds = useSelector((state) => state.favourite.pendingIds);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const p = property || {
    id: 1,
    title: "Modern Mediterranean Villa",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    city: "Beverly Hills, CA",
    bedrooms: 6,
    bathrooms: 7,
    area: "8,500 sqft",
    price: 8500000,
    type: "Villa",
    featured: true,
  };

  const isFav = favouriteItems.some((item) => item.id === p.id);
  const isFavouritePending = pendingIds.includes(p.id);

  const handleToggleFavourite = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      if (isFav) {
        await dispatch(removeFromFavourite(p.id)).unwrap();
      } else {
        await dispatch(addToFavourite(p)).unwrap();
      }
    } catch (error) {
      console.error("Favorite update failed:", error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/listing/${p.id}`)}
      className={`w-full max-w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 relative cursor-pointer hover:shadow-2xl transition ${className}`}
    >
      {/* Badges */}
      <div className="absolute left-3 right-12 top-3 z-10 flex flex-wrap gap-2 sm:left-4 sm:top-4">
        {p.featured && (
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
        {p.type && (
          <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-800">
            {p.type}
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavourite}
        type="button"
        disabled={isFavouritePending}
        className="absolute right-3 top-3 z-10 text-2xl disabled:cursor-not-allowed disabled:opacity-60 sm:right-4 sm:top-4"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-600 hover:text-red-500" />
        )}
      </button>

      {/* Image */}
      <CardImage key={p.image} src={p.image} alt={p.title} />

      <div className="p-4 pb-4 sm:p-6 sm:pb-4">
        {/* Title */}
        <h3 className="mb-1 text-lg font-bold leading-snug text-slate-950 dark:text-white sm:text-xl">{p.title}</h3>

        {/* Location */}
        <div className="mb-3 flex items-center gap-1 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-gray-400" />
          {p.city || p.address || "Location not specified"}
        </div>

        {/* Details */}
        <div className="mb-4 flex flex-wrap justify-between gap-x-3 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaBed />
            {p.bedrooms ?? "-"} Beds
          </div>

          <div className="flex items-center gap-1">
            <FaBath />
            {p.bathrooms ?? "-"} Baths
          </div>

          <div className="flex items-center gap-1">
            <FaRulerCombined />
            {p.area || "-"}
          </div>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-blue-900 sm:text-2xl">
          {p.price ? `$${p.price.toLocaleString()}` : "Price not available"}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
