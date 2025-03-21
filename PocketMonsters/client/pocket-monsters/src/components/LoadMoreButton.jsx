import LoadingSpinner from "./LoadingSpinner";

export default function LoadMoreButton({ loading, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-[#D1A7E0] to-[#A7E0D1] text-white font-bold shadow-md`}
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
