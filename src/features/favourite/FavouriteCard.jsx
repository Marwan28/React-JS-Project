import React from "react";
import { useDispatch } from "react-redux";
import { removeFromFavourite } from "./favouriteSlice";

export default function FavouriteCard({ property }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromFavourite(property.id));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      
     

        {/* Remove Button */}
        {/* <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow"
        >
          <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22
              8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button> */}
      </div>

  );
}