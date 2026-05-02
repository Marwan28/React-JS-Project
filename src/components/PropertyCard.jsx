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

function PropertyCard({ property, className = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourite.items);

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

  return (
    <div
      onClick={() => navigate(`/listing/${p.id}`)}
      className={`w-full max-w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 relative cursor-pointer hover:shadow-2xl transition ${className}`}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {p.featured && (
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        {p.type && (
          <span className="bg-yellow-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            {p.type}
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isFav) {
            dispatch(removeFromFavourite(p.id));
          } else {
            dispatch(addToFavourite(p));
          }
        }}
        className="absolute top-4 right-4 z-10 text-2xl"
      >
        {isFav ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-600 hover:text-red-500" />
        )}
      </button>

      {/* Image */}
      <img
        className="w-full aspect-[4/3] object-cover"
        src={p.image}
        alt={p.title}
      />

      <div className="p-6 pb-4">
        {/* Title */}
        <h3 className="font-bold text-xl mb-1">{p.title}</h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3 gap-1">
          <FaMapMarkerAlt className="text-gray-400" />
          {p.city || p.address || "Location not specified"}
        </div>

        {/* Details */}
        <div className="flex justify-between text-gray-600 text-sm mb-4">
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
        <div className="font-bold text-2xl text-blue-900">
          {p.price ? `$${p.price.toLocaleString()}` : "Price not available"}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
