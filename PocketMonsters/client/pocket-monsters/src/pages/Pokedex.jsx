import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

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
        console.log("error====> ", response);
        throw new Error(`Please try again`, response);
      }

      const { data, metadata: meta } = await response.json();
      return { data, meta };
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      throw new Error(`Failed to fetch Pokémon: please re-try`);
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

  if (loading && currentPage === 1)
    return <div className="text-center mt-8">Loading...</div>;

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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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

      {/* Add Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search Pokémon by name or number..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1 text-center">
          Search by name (e.g. "charizard") or number (e.g. "006")
        </p>
      </div>

      {loading && currentPage === 1 ? (
        <div className="text-center mt-8">Loading...</div>
      ) : error && pokemonList.length === 0 ? (
        // <p>Failed to fetch Pokémon: please re-try</p>
        <div className="text-center mt-8 p-4">
          <div className="inline-block bg-red-100 rounded-lg p-4">
            <p className="text-red-800">
              Failed to fetch Pokémon: please re-try
            </p>
          </div>
        </div>
      ) : pokemonList.length === 0 ? (
        <div className="text-center mt-8 p-4">
          <div className="inline-block bg-yellow-100 rounded-lg p-4">
            <p className="text-yellow-800">
              No Pokémon found matching "{searchTerm}"
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonList.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.uid}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-sm text-gray-500 text-right">
                  #{pokemon.uid.toString().padStart(3, "0")}
                </div>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="mx-auto w-32 h-32 object-contain"
                />
                <h3 className="text-center font-semibold capitalize mt-2">
                  {pokemon.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 text-sm rounded-full capitalize"
                      style={{
                        backgroundColor: `var(--type-${type})`,
                        color: "white",
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-center text-sm text-gray-600">
                  <p>Height: {pokemon.height / 10}m</p>
                  <p>Weight: {pokemon.weight / 10}kg</p>
                </div>
              </Link>
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
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingMore ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Load More Pokémon"
                )}
              </button>
              <p className="mt-2 text-sm text-gray-500">
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
