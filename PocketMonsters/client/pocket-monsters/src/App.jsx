import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";

const Home = lazy(() => import("./pages/Home"));
const Pokedex = lazy(() => import("./pages/Pokedex"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

function App() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
