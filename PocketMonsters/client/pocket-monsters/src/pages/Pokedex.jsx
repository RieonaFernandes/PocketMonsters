import { useState, useEffect, useCallback } from "react";
import SearchInput from "../components/SearchInput";
import PokemonCard from "../components/PokemonCard";
import LoadMoreButton from "../components/LoadMoreButton";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemon = useCallback(async (page, search = "") => {
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
          // minHeight: 0,
          // minWeight: 0,
          // weakness: "",
          search: search,
          // type: "",
          // maxHeight: 10000,
          // maxWeight: 10000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Please try again`, response);
      }

      const { data, metadata: meta } = await response.json();
      return { data, meta };
    } catch (error) {
      throw new Error(`Failed to fetch Pokémon: please re-try`, error);
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const { data, meta } = await fetchPokemon(currentPage, searchTerm);

      setPokemonList((prev) => (currentPage === 1 ? data : [...prev, ...data]));
      setMetadata(meta);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentPage, searchTerm, fetchPokemon]);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      loadData();
    }
  };

  const handleLoadMore = () => {
    if (metadata && currentPage < metadata.total_pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && currentPage === 1) {
    return (
      <div className="text-center mt-8">
        <LoadingSpinner size={8} />
      </div>
    );
  }

  if (error && pokemonList.length === 0) {
    return (
      <div className="text-center mt-8 p-4">
        <div className="inline-block bg-red-100 rounded-lg p-4">
          <div className="text-red-600 font-semibold mb-2">
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
            Error Loading Pokémon
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-30 py-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />

      {loading && currentPage === 1 ? (
        <div className="text-center mt-8">
          <LoadingSpinner size={8} />
        </div>
      ) : error && pokemonList.length === 0 ? (
        <Alert type="error" message="Failed to fetch Pokémon: please re-try" />
      ) : pokemonList.length === 0 ? (
        <Alert
          type="warning"
          message={`No Pokémon found matching "${searchTerm}"`}
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
  );
}
