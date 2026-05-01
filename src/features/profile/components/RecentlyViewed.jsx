import React from "react";
import { useSelector } from "react-redux";
import PropertyCard from "../../../components/PropertyCard";

const RecentlyViewed = () => {
  const viewedProperties = useSelector(
    (state) => state.history.viewedProperties
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 font-serif">
      <h3 className="text-base font-semibold mb-3">Recently Viewed</h3>

      {viewedProperties.length === 0 ? (
        <p className="text-sm text-gray-500">
          No properties viewed yet
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewedProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={{
                ...property,
                city: property.location
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;