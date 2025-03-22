import { useError } from "../hooks/UseError";

export default function ErrorMessage() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative mb-4">
      {/* <span className="block sm:inline" data-testid="error-message">
        {typeof error === "string" ? error : "An unknown error occurred"}
      </span> */}
      <span className="block sm:inline">
        {error.includes("Failed to load") ? (
          <>
            {error}
            <br />
            <small className="text-red-600">
              {/* (Technical details logged in console) */}
              (Please try again in some time)
            </small>
          </>
        ) : (
          error
        )}
      </span>
      <button
        onClick={clearError}
        className="absolute top-0 right-0 px-4 py-3 hover:text-red-900"
        aria-label="Dismiss error"
      >
        &times;
      </button>
    </div>
  );
}
