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

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <SearchBar onSearch={setSearchTerm} />

        <div className="flex items-start gap-8">
          <aside className="w-80">
            <Filters onApply={handleApplyFilters} />
          </aside>

          <main className="flex-1">
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
