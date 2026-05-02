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
    <div className="w-full flex flex-col py-8 px-2 md:px-0">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-1">
            Featured Properties
          </h2>

          <p className="text-gray-500 text-base md:text-lg mb-4 md:mb-0">
            Handpicked luxury homes for the discerning buyer
          </p>
        </div>

        <button
          className="border border-gray-200 rounded-lg px-6 py-2 text-base font-medium hover:bg-gray-50 transition flex items-center gap-2 mt-2 md:mt-0"
          onClick={() => navigate("/listing")}
        >
          View All <span aria-hidden>›</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-4 md:px-8 w-full">
        {properties.slice(0, 3).map((property) => (
          <div className="w-full h-full" key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
}