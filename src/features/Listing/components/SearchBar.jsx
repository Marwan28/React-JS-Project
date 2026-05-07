import { useState } from "react";

export default function SearchBar({
  onSearch,
  placeholder = "Search by title",
}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(query.trim());
  }

  function handleClear() {
    setQuery("");
    onSearch?.("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:px-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <label className="sr-only" htmlFor="listing-search">
            Search properties
          </label>

          <input
            id="listing-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex">
          <button
            type="submit"
            className="rounded-xl bg-[#183a46] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}
