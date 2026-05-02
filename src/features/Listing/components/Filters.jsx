import { useState } from "react";
import RadioGroup from "./RadioGroup";

const propertyTypes = [
  { label: "All Types", value: "" },
  { label: "Villa", value: "Villa" },
  { label: "House", value: "House" },
  { label: "Apartment", value: "Apartment" },
  { label: "Penthouse", value: "Penthouse" },
];

const bedroomsOptions = [
  { label: "Any", value: "" },
  { label: "3+ Bedrooms", value: 3 },
  { label: "4+ Bedrooms", value: 4 },
  { label: "5+ Bedrooms", value: 5 },
  { label: "6+ Bedrooms", value: 6 },
];

const initialFilters = {
  type: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  location: "",
};

export default function Filters({ onApply }) {
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(e) {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: name === "bedrooms" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function handleClear() {
    setFilters(initialFilters);

    onApply?.(initialFilters);
  }

  function handleApply(e) {
    e.preventDefault();

    onApply?.(filters);
  }

  return (
    <form
      onSubmit={handleApply}
      className="bg-white rounded-lg p-6 shadow-sm border"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>

        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Clear All
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <RadioGroup
          title="Property Type"
          name="type"
          options={propertyTypes}
          value={filters.type}
          onChange={handleChange}
        />

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-slate-700">Price Range</h4>

          <div className="mt-3 space-y-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-2 text-sm"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-2 text-sm"
            />
          </div>
        </div>

        <RadioGroup
          title="Bedrooms"
          name="bedrooms"
          options={bedroomsOptions}
          value={filters.bedrooms}
          onChange={handleChange}
        />

        {/* Location */}
        <div>
          <h4 className="text-sm font-medium text-slate-700">Location</h4>

          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleChange}
            className="mt-3 w-full rounded-md border px-4 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#183a46] text-white py-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
