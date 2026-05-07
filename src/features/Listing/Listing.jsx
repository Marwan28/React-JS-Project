import { useCallback, useState } from "react";
import ListingHeader from "./components/HeaderListing";
import Filters from "./components/Filters";
import ListingList from "./components/ListingList";
import SearchBar from "./components/SearchBar";

export default function Listing() {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };

  const handleResultsCount = useCallback((resultsCount) => {
    setCount(resultsCount);
  }, []);

  return (
    <div>
      <ListingHeader count={count} />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:space-y-8 lg:py-10">
        <SearchBar onSearch={setSearchTerm} />

        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="w-full lg:w-80 lg:shrink-0">
            <Filters onApply={handleApplyFilters} />
          </aside>

          <main className="min-w-0 flex-1">
            <ListingList
              filters={filters}
              searchTerm={searchTerm}
              onResultsCount={handleResultsCount}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
