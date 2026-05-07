import { useEffect, useState } from "react";
import PropertyCard from "../../../components/PropertyCard";
import { propertyService } from "../../../services/propertyService";

export default function ListingList({
  filters = {},
  searchTerm = "",
  onResultsCount,
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);

        let filterObj = {};

        // type
        if (filters.type) {
          filterObj.type = filters.type;
        }

        // bedrooms >=
        if (filters.bedrooms) {
          filterObj.bedrooms_gte = filters.bedrooms;
        }

        // min price
        if (filters.minPrice) {
          filterObj.price_gte = filters.minPrice;
        }

        // max price
        if (filters.maxPrice) {
          filterObj.price_lte = filters.maxPrice;
        }

        if (filters.location?.trim()) {
          filterObj.location = filters.location.trim();
        }

        if (searchTerm) {
          filterObj.search = searchTerm;
        }

        const data = searchTerm
          ? await propertyService.search(searchTerm, filterObj)
          : await propertyService.getAll(filterObj);

        const results = data || [];
        setProperties(results);
        onResultsCount?.(results.length);
      } catch (error) {
        console.error(error);
        onResultsCount?.(0);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters, searchTerm, onResultsCount]);

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          No properties found
        </div>
      )}
    </div>
  );
}
