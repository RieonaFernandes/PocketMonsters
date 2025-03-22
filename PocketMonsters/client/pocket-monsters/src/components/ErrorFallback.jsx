import { useError } from "../hooks/UseError";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const { clearError } = useError();

  const handleReset = () => {
    clearError();
    resetErrorBoundary();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 relative px-8 py-3">
        <div className="inline-block bg-red/70 shadow-lg backdrop-blur-lg border-2 border-red-200 relative rounded-lg overflow-hidden">
          <div className="error-fallback bg-red-50 p-4 rounded-lg text-center">
            <h3 className="text-red-600 font-bold mb-2">
              Something went wrong!
            </h3>
            <button
              onClick={handleReset}
              className="bg-red-600 text-sm text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
