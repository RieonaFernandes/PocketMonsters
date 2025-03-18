import LoadingSpinner from "./LoadingSpinner";

export default function LoadMoreButton({ loading, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded
               disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner />
          <span className="ml-2">Loading...</span>
        </span>
      ) : (
        "Load More Pokémon"
      )}
    </button>
  );
}
