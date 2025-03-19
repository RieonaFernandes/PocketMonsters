import { useState, useEffect, useCallback } from "react";
import SearchInput from "../components/SearchInput";
import PokemonCard from "../components/PokemonCard";
import LoadMoreButton from "../components/LoadMoreButton";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";
import FiltersSection from "../components/FiltersSection";
import RangeFilter from "../components/RangeFilter";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    types: [],
    weaknesses: [],
    height: null,
    weight: null,
  });
  const [filterOptions, setFilterOptions] = useState(null);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/pokedex/fillers?timestamp=${Date.now()}`
        );

        if (!response.ok) {
          throw new Error(
            `Error loading page. Please refresh the page or try again later.`
          );
        }

        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        setError(error.message);
        throw new Error(error.message);
      }
    };
    fetchFilterOptions();
  }, []);

  const fetchPokemon = useCallback(
    async (page, search = "") => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/pokedex", {
          method: "POST",
          headers: {
            // "x-forwarded-proto": "https",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            limit: 12,
            sortBy: "uid",
            sortOrder: 1,
            search: search,
            type: filters.types.join(","),
            weakness: filters.weaknesses.join(","),
            minHeight: filters.height?.minHeight || 0,
            maxHeight: filters.height?.maxHeight || 10000,
            minWeight: filters.weight?.minWeight || 0,
            maxWeight: filters.weight?.maxWeight || 10000,
          }),
        });

        if (!response.ok) {
          throw new Error(`Please try again`, response);
        }

        const { data, metadata: meta } = await response.json();
        return { data, meta };
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        throw new Error(`Failed to fetch Pokémon. Please try again`);
      }
    },
    [filters]
  );

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const { data, meta } = await fetchPokemon(currentPage, appliedSearchTerm);

      setPokemonList((prev) => (currentPage === 1 ? data : [...prev, ...data]));
      setMetadata(meta);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentPage, appliedSearchTerm, fetchPokemon]);

  useEffect(() => {
    loadData();
  }, [currentPage, loadData]);

  const handleRangeFilter = (filterType) => (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: selectedOption === prev[filterType] ? null : selectedOption,
    }));
    setCurrentPage(1);
  };

  const handleFilterToggle = (filterType) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((t) => t !== value)
        : [...prev[filterType], value],
    }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setAppliedSearchTerm(searchTerm);
      setCurrentPage(1);
    }
  };

  const handleLoadMore = () => {
    if (metadata && currentPage < metadata.total_pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size={8} />
        </div>
      </div>
    );
  }

  if (error && (pokemonList.length === 0 || filterOptions == null)) {
    return (
      <div className="min-h-screen flex mt-8 items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-block bg-red-100 rounded-lg p-4">
            <div className="text-red-600 font-semibold mb-3 text-xl">
              <svg
                className="inline w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Error Loading {filterOptions == null ? `Page` : `Pokémon`}
            </div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Filters Section */}
        <div className="lg:col-span-1 space-y-4">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />

          <div className="space-y-6">
            <FiltersSection
              title="Filter by Types"
              options={filterOptions?.type || []}
              selectedValues={filters.types}
              onToggle={handleFilterToggle("types")}
            />

            <FiltersSection
              title="Filter by Weaknesses"
              options={filterOptions?.type || []}
              selectedValues={filters.weaknesses}
              onToggle={handleFilterToggle("weaknesses")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <RangeFilter
                title="Height"
                options={filterOptions?.height || []}
                selected={filters.height}
                onSelect={handleRangeFilter("height")}
              />

              <RangeFilter
                title="Weight"
                options={filterOptions?.weight || []}
                selected={filters.weight}
                onSelect={handleRangeFilter("weight")}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading && currentPage === 1 ? (
            // <div className="text-center mt-8">
            //   <LoadingSpinner size={8} />
            // </div>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size={8} />
              </div>
            </div>
          ) : error && pokemonList.length === 0 ? (
            <Alert
              type="error"
              message="Failed to fetch Pokémon: please re-try"
            />
          ) : pokemonList.length === 0 ? (
            <Alert
              type="warning"
              message={
                "No Pokémon found matching " +
                (searchTerm ? `"${searchTerm}"` : "this filter")
              }
            />
          ) : (
            <>
              <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pokemonList.map((pokemon) => (
                  <PokemonCard key={pokemon.uid} pokemon={pokemon} />
                ))}
              </div>

              {error && (
                <div className="mt-4 text-center bg-red-100 p-4 rounded-lg">
                  <p className="text-red-600 mb-2">{error}</p>
                  <button
                    onClick={loadData}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Retry Loading
                  </button>
                </div>
              )}

              {metadata && currentPage < metadata.total_pages && (
                <div className="mt-8 text-center">
                  <LoadMoreButton
                    loading={isLoadingMore}
                    onClick={handleLoadMore}
                    disabled={currentPage >= metadata.total_pages}
                  />

                  <p className="mt-4 text-sm text-gray-600">
                    Showing {pokemonList.length} of {metadata.total} Pokémon
                  </p>
                  <p className="text-gray-600">
                    Page {metadata.current_page} of {metadata.total_pages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
