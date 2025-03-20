import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";

export default function Pokemon() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [languages, setLanguages] = useState([]);

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
        setLanguages(data.language);
      } catch (error) {
        setError(error.message);
        throw new Error(error.message);
      }
    };

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/pokedex/${id}?timestamp=${Date.now()}`
        );
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();
        const [details] = data.pokemonData;
        const [cardInfo] = data.cardData;

        setPokemonData(details);
        setCardData(cardInfo);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFilterOptions();
    fetchPokemonDetails();
  }, [id]);

  const getLanguageName = (languageName) => {
    const language = languages.find((lang) => lang.name === languageName);
    return language ? language["en-name"] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert type="error" message={error} />
      </div>
    );
  }

  if (!pokemonData || !cardData) return null;

  // Get first English flavor text
  const flavorText =
    cardData.flavor_text_entries.find((text) =>
      typeof text === "string" ? false : text.language?.name === "en"
    ) || cardData.flavor_text_entries[0];

  return (
    <div className="container mx-auto px-18 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold capitalize mb-2">
          {pokemonData.name}
        </h1>
        <div className="flex justify-center gap-2">
          {pokemonData.type.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4">
        {/* Image Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div
              // className="flex flex-wrap gap-4"
              onMouseEnter={() => setShowGif(true)}
              onMouseLeave={() => setShowGif(false)}
            >
              <div className="aspect-square w-full max-w-48 mx-auto overflow-hidden rounded-lg">
                <img
                  src={
                    showGif && pokemonData.gif
                      ? pokemonData.gif
                      : pokemonData.image
                  }
                  alt={pokemonData.name}
                  className={pokemonData.gif ? "w-30 h-30" : "w-full h-full" + " object-contain transition-transform duration-300 group-hover:scale-100"}
                />
              </div>
              {pokemonData.gif && (
                <div className="py-6">
                  <div className=" float-right bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    Hover to animate
                  </div>
                </div>
              )}
            </div>
            {/* Abilities */}
            <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemonData.abilities.map((ability) => (
                <span
                  key={ability}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {ability}
                </span>
              ))}
            </div>
            {/* Basic Info */}
            <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  Height: {pokemonData.height / 10}m
                </p>
                <p className="text-gray-600">
                  Weight: {pokemonData.weight / 10}kg
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Weaknesses:</p>
                <div className="flex flex-wrap gap-1">
                  {pokemonData.weaknesses.map((weakness) => (
                    <TypeBadge key={weakness} type={weakness} />
                  ))}
                </div>
              </div>
            </div>

            {/* Names in Other Languages*/}
            {cardData.names && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  International Names
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cardData.names.map((nameEntry) => (
                    <div
                      key={nameEntry._id}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100 relative"
                    >
                      <span className="absolute top-1 right-1 text-xs text-gray-400">
                        {typeof nameEntry.language === "object"
                          ? (getLanguageName(nameEntry.language.name))
                          : null}
                      </span>
                      <p className="text-lg font-semibold mt-3">
                        {nameEntry.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Text */}
            {flavorText && (
              <p className="italic text-gray-600 p-6">
                "
                {typeof flavorText === "string"
                  ? flavorText
                  : flavorText.flavor_text}
                "
              </p>
            )}
            {/* Stats */}
            <h2 className="text-2xl font-semibold mb-4">Stats</h2>
            <div className="space-y-3">
              {pokemonData.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  statName={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>
            {/* Moves */}
            <div className="grid md:grid-cols-1 mt-8">
              <h2 className="text-2xl font-semibold mb-4">Notable Moves</h2>
              <div className="flex flex-wrap gap-2">
                {pokemonData.moves.slice(0, 10).map((move) => (
                  <span
                    key={move}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
