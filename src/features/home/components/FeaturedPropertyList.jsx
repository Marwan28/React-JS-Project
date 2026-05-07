import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../../../services/propertyService";
import PropertyCard from "../../../components/PropertyCard";

export default function FeaturedPropertyList() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const data = await propertyService.getFeatured();
        setProperties(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6">
      <div className="mt-8 flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold sm:text-3xl md:text-4xl">
            Featured Properties
          </h2>

          <p className="text-gray-500 text-base md:text-lg mb-4 md:mb-0">
            Handpicked luxury homes for the discerning buyer
          </p>
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-2 text-base font-medium transition hover:bg-gray-50 sm:w-auto"
          onClick={() => navigate("/listing")}
        >
          View All <span aria-hidden>›</span>
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 3).map((property) => (
          <div className="w-full h-full" key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
}
