import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TypeBadge from "../components/TypeBadge";
import StatBar from "../components/StatBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import {
  ArrowsPointingOutIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
  AcademicCapIcon,
  SparklesIcon,
  BookOpenIcon,
  ArrowPathIcon,
  VideoCameraIcon,
  HandRaisedIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
const pokedexEndpoint = import.meta.env.VITE_APP_POKEDEX_ENDPOINT;
const poke_ball = import.meta.env.VITE_GEN5_POKE_BALL_IMG;
const animated_pokemon = import.meta.env.VITE_ANIMATED_POKEMONS;

export default function Pokemon() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const currentId = Number(id);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          `${apiUrl}${pokedexEndpoint}/fillers?timestamp=${Date.now()}`
        );
        if (!response.ok) {
          throw new Error(
            `Error loading page. Please refresh the page or try again later.`
          );
        }
        const data = await response.json();
        setLanguages(data.language);
        setCount(data.count);
      } catch (error) {
        setError(error.message);
        throw new Error(error.message);
      }
    };

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `${apiUrl}${pokedexEndpoint}/${id}?timestamp=${Date.now()}`
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

  useEffect(() => {
    if (cardData?.flavor_text_entries) {
      setCurrentFlavorIndex(0);
    }
  }, [cardData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const getLanguageName = (languageName) => {
    const language = languages.find((lang) => lang.name === languageName);
    return language ? language["en-name"] : null;
  };

  const handleFlavorTextClick = () => {
    if (!cardData?.flavor_text_entries) return;

    const entries = cardData.flavor_text_entries;
    if (entries.length <= 1) return;

    // Get new random index different from current
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * entries.length);
    } while (newIndex === currentFlavorIndex);

    setCurrentFlavorIndex(newIndex);
  };

  const handlePrevious = () => {
    if (currentId > 1) {
      navigate(`/pokemon/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/pokemon/${currentId + 1}`);
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

  return (
    <div className="pokemon-background">
      <div className="min-h-screen bg-gradient-to-b from-[#5A7D9D]/10 to-[#A3C9F1]/10 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-block bg-gradient-to-r from-[#F9E265]/20 via-[#D1A7E0]/20 to-[#A7E0D1]/20 px-8 py-4 rounded-full shadow-lg backdrop-blur-lg border-2 border-[#A3C9F1]/30 hover:scale-105 transition-transform">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold capitalize drop-shadow-lg bg-[#5A7D9D] bg-clip-text text-transparent">
                {pokemonData.name}
              </h1>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {pokemonData.type.map((type) => (
                <TypeBadge
                  key={type}
                  type={type}
                  className="border-2 border-[#A3C9F1]/30 hover:border-[#D1A7E0]/50 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            {/* Image Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-[#A3C9F1]/20 hover:border-[#D1A7E0]/30 transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                    <h2 className="text-xl font-semibold text-[#5A7D9D]">
                      Pokémon Visual
                    </h2>
                  </div>

                  <div
                    className="relative aspect-square w-full max-w-56 mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-[#F9E265]/10 to-[#D1A7E0]/10"
                    onMouseEnter={() => setShowGif(true)}
                    onMouseLeave={() => setShowGif(false)}
                  >
                    <img
                      src={
                        showGif && pokemonData.gif
                          ? pokemonData.gif
                          : pokemonData.image
                      }
                      alt={pokemonData.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 p-4 py-7"
                    />

                    {pokemonData.gif && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-[#F9E265]/80 to-[#D1A7E0]/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                        <VideoCameraIcon className="w-4 h-4" />
                        <span>Hover to animate</span>
                      </div>
                    )}

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5A7D9D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {/* Abilities */}
                <div className="bg-white/80 p-6 rounded-xl shadow-lg space-y-4">
                  <h2 className="text-xl font-semibold text-[#5A7D9D] flex items-center gap-2">
                    <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                    Pokémon Abilities
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {pokemonData.abilities.map((ability) => (
                      <div
                        key={ability}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#F9E265]/10 to-[#D1A7E0]/10 px-4 py-2 rounded-full transition-all hover:from-[#F9E265]/20 hover:to-[#D1A7E0]/20 hover:shadow-sm"
                      >
                        <SparklesIcon className="w-4 h-4 text-[#D1A7E0]" />
                        <span className="text-[#5A7D9D] text-sm font-medium">
                          {ability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flavor Text */}
                {cardData.flavor_text_entries?.length > 0 && (
                  <div className="bg-white/80 p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-xl font-semibold text-[#5A7D9D] flex items-center gap-2 mb-4">
                      <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                      Pokédex Entries
                    </h2>

                    <div
                      className="group relative p-4 rounded-lg border border-[#A3C9F1]/30 transition-all hover:border-[#D1A7E0]/50 cursor-pointer"
                      onClick={handleFlavorTextClick}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F9E265]/10 to-[#D1A7E0]/10 opacity-30 group-hover:opacity-50 rounded-lg" />

                      <div className="relative flex items-start gap-3">
                        <BookOpenIcon className="w-5 h-5 text-[#5A7D9D]/70 flex-shrink-0 mt-1" />
                        <p className="text-[#5A7D9D] italic leading-relaxed">
                          {typeof cardData.flavor_text_entries[
                            currentFlavorIndex
                          ] === "string"
                            ? `"${cardData.flavor_text_entries[currentFlavorIndex]}"`
                            : `"${cardData.flavor_text_entries[currentFlavorIndex].flavor_text}"`}
                        </p>
                      </div>

                      <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-[#5A7D9D]/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowPathIcon className="w-4 h-4" />
                        <span>Click to cycle</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Moves */}
                <div className="bg-white/80 p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl font-semibold text-[#5A7D9D] flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                    Notable Moves
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {pokemonData.moves.slice(0, 10).map((move) => (
                      <div
                        key={move}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#F9E265]/10 to-[#D1A7E0]/10 px-4 py-2 rounded-full transition-all hover:from-[#F9E265]/20 hover:to-[#D1A7E0]/20 hover:shadow-sm"
                      >
                        <HandRaisedIcon className="w-4 h-4 text-[#D1A7E0]" />
                        <span className="text-[#5A7D9D] text-sm font-medium">
                          {move}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-xl shadow-lg space-y-4">
                  <h2 className="text-xl font-semibold text-[#5A7D9D] flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    {/* Height */}
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center gap-3 text-[#5A7D9D]">
                        <ArrowsPointingOutIcon className="w-5 h-5 text-[#F9E265]" />
                        <span className="font-medium">Height</span>
                      </div>
                      <span className="text-[#5A7D9D] font-mono bg-[#F9E265]/10 px-3 py-1 rounded-lg">
                        {pokemonData.height / 10}m
                      </span>
                    </div>

                    {/* Weight */}
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center gap-3 text-[#5A7D9D]">
                        <ScaleIcon className="w-5 h-5 text-[#D1A7E0]" />
                        <span className="font-medium">Weight</span>
                      </div>
                      <span className="text-[#5A7D9D] font-mono bg-[#D1A7E0]/10 px-3 py-1 rounded-lg">
                        {pokemonData.weight / 10}kg
                      </span>
                    </div>

                    {/* Habitat */}
                    <div className="flex justify-between items-center group">
                      <div className="flex items-center gap-3 text-[#5A7D9D]">
                        <MapPinIcon className="w-5 h-5 text-[#A7E0D1]" />
                        <span className="font-medium">Habitat</span>
                      </div>
                      <span className="text-[#5A7D9D] font-mono bg-[#A7E0D1]/10 px-3 py-1 rounded-lg capitalize">
                        {cardData?.habitat?.name || "Unknown"}
                      </span>
                    </div>

                    {/* Weaknesses */}
                    <div className="pt-4 border-t border-[#A3C9F1]/20">
                      <div className="flex items-center gap-3 text-[#5A7D9D] mb-3">
                        <ShieldExclamationIcon className="w-5 h-5 text-[#D1A7E0]" />
                        <span className="font-medium">Weaknesses</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pokemonData.weaknesses.map((weakness) => (
                          <TypeBadge
                            key={weakness}
                            type={weakness}
                            className="bg-[#D1A7E0]/20 hover:bg-[#D1A7E0]/30 transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white/80 p-6 rounded-xl shadow-lg space-y-4">
                  <h2 className="text-xl font-semibold text-[#5A7D9D] flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                    Stats Overview
                  </h2>

                  <div className="space-y-4">
                    {pokemonData.stats.map((stat) => (
                      <div key={stat.stat.name} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-3 text-[#5A7D9D]">
                            {/* Add appropriate icon for each stat */}
                            {stat.stat.name === "hp" && (
                              <HeartIcon className="w-5 h-5 text-red-400" />
                            )}
                            {stat.stat.name === "attack" && (
                              <AcademicCapIcon className="w-5 h-5 text-orange-400" />
                            )}
                            {stat.stat.name === "defense" && (
                              <ShieldExclamationIcon className="w-5 h-5 text-blue-400" />
                            )}
                            {stat.stat.name === "special-attack" && (
                              <SparklesIcon className="w-5 h-5 text-purple-400" />
                            )}
                            {stat.stat.name === "special-defense" && (
                              <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                            )}
                            {stat.stat.name === "speed" && (
                              <BoltIcon className="w-5 h-5 text-yellow-400" />
                            )}
                            <span className="font-medium capitalize">
                              {stat.stat.name.replace("-", " ")}
                            </span>
                          </div>
                          <span className="text-[#5A7D9D] font-mono bg-[#A3C9F1]/10 px-3 py-1 rounded-lg">
                            {stat.base_stat}
                          </span>
                        </div>
                        <StatBar
                          value={stat.base_stat}
                          gradient="from-[#F9E265] to-[#D1A7E0]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Animated Gif and Bouncing Pokéballs */}
                <div className="flex items-center xs:justify-center justify-between overflow-hidden group gap-2">
                  <img
                    src={`${poke_ball}`}
                    className="w-2 sm:w-4 md:w-6 lg:w-8 h-2 sm:h-4 md:h-6 lg:h-8 animate-bounce"
                    alt="Pokéball"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <img
                    src={
                      pokemonData.gif
                        ? `${animated_pokemon}/${pokemonData.uid}.gif`
                        : `${poke_ball}`
                    }
                    className={
                      pokemonData.gif
                        ? "w-16 sm:w-18 md:w-20 lg:w-22 h-16 sm:h-18 md:h-20 lg:h-22"
                        : "w-7 sm:w-9 md:w-11 lg:w-13 h-7 sm:h-9 md:h-11 lg:h-13 animate-bounce"
                    }
                    alt="Pokémon"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <img
                    src={`${poke_ball}`}
                    className="w-5 sm:w-7 md:w-9 lg:w-11 h-5 sm:h-7 md:h-9 lg:h-11 animate-bounce"
                    alt="Pokéball"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <img
                    src={`${poke_ball}`}
                    className="w-2 sm:w-2 md:w-3 lg:w-5 h-2 sm:h-2 md:h-3 lg:h-5 animate-bounce"
                    alt="Pokéball"
                    style={{ animationDelay: "0.1s" }}
                  />
                </div>
              </div>
            </div>

            {/* Names in Other Languages*/}
            {cardData.names && (
              <div className="bg-white/80 p-6 rounded-xl shadow-lg mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] w-1 h-6 rounded-full" />
                  <h2 className="text-xl font-semibold text-[#5A7D9D]">
                    International Names
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cardData.names.map((nameEntry) => (
                    <div
                      key={nameEntry._id}
                      className="group relative p-4 rounded-xl border-2 border-[#A3C9F1]/20 bg-gradient-to-br from-[#F9E265]/5 to-[#D1A7E0]/5 hover:border-[#D1A7E0]/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <GlobeAltIcon className="w-5 h-5 text-[#5A7D9D]/70 flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-xs text-[#5A7D9D]/60 mb-1 block">
                            {typeof nameEntry.language === "object" &&
                              getLanguageName(nameEntry.language.name)}
                          </span>
                          <p className="text-base font-semibold text-[#5A7D9D]">
                            {nameEntry.name}
                          </p>
                        </div>
                      </div>
                      <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-[#F9E265]/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Next pages */}
          <div className="flex gap-2 justify-between mt-8 mb-4 px-4">
            <button
              onClick={handlePrevious}
              disabled={currentId === 1}
              className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-[#D1A7E0] to-[#A7E0D1] text-white font-bold shadow-md flex items-center justify-center gap-2 ${
                currentId === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5" /> Previous Pokémon
            </button>

            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-[#D1A7E0] to-[#A7E0D1] text-white font-bold shadow-md flex items-center justify-center gap-2 ${
                currentId === count
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
              }`}
            >
              Next Pokémon
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
