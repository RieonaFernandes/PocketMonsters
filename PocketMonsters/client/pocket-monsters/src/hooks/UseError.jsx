import { createContext, useContext, useState, useCallback } from "react";
const env = import.meta.env.VITE_ENV;

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    if (env === "dev" || env === "local") {
      console.error("Global Error:", errorMessage);

      console.error("Error Details:", {
        message: errorMessage,
        originalError: error.originalError || error,
        stack: error.stack,
        url: error.url,
      });
    }

    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
