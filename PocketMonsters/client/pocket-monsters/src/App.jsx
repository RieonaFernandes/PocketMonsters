import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import { ErrorProvider } from "./hooks/UseError";
import ErrorMessage from "./components/ErrorMessage";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const Pokedex = lazy(() => import("./pages/Pokedex"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

function App() {
  return (
    <ErrorProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="app-container">
          <ErrorMessage />
          <Router>
            <Navigation />
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <LoadingSpinner size={8} />
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokedex" element={<Pokedex />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </ErrorBoundary>
    </ErrorProvider>
  );
}

export default App;
