import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ShieldExclamationIcon,
  ArrowRightIcon,
  BookOpenIcon,
  SparklesIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5A7D9D]/10 to-[#A3C9F1]/10 home-background">
      <main className="p-25">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
            <div className="inline-block bg-white/60 px-8 py-4 rounded-full shadow-xl backdrop-blur-lg border-4 border-[#A3C9F1]/30 hover:scale-105 transition-transform">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg bg-gradient-to-r from-[#F9E265] via-[#D1A7E0] to-[#A7E0D1] bg-clip-text text-transparent">
                Gotta Catch 'Em All!
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-[#5A7D9D] mb-8 max-w-2xl mx-auto font-medium italic mt-6 flex items-center justify-center gap-2">
              <SparklesIcon className="w-6 h-6 text-[#F9E265]" />
              Embark on an epic journey to become the ultimate Pokémon Master!
              <SparklesIcon className="w-6 h-6 text-[#D1A7E0]" />
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 px-10 xs:px-10 sm:px-20 md:px-30 gap-6 mb-12">
            {[
              {
                title: "Explore Pokédex",
                icon: <MagnifyingGlassIcon className="w-8 h-8 text-white" />,
                color: "bg-[#5A7D9D]",
                text: "Discover over 1000 Pokémon with detailed stats, types, and evolutions!",
                emoji: <BookOpenIcon className="w-6 h-6 text-[#5A7D9D]" />,
              },
              {
                title: "Advanced Filters",
                icon: <Cog6ToothIcon className="w-8 h-8 text-white" />,
                color: "bg-[#D1A7E0]",
                text: "Search by type, abilities, regions, and more to find your perfect team!",
                emoji: <AcademicCapIcon className="w-6 h-6 text-[#5A7D9D]" />,
              },
              {
                title: "Battle Ready",
                icon: <ShieldExclamationIcon className="w-8 h-8 text-white" />,
                color: "bg-[#A7E0D1]",
                text: "Analyze stats, weaknesses, and moves to build your ultimate battle strategy!",
                emoji: (
                  <ShieldExclamationIcon className="w-6 h-6 text-[#5A7D9D]" />
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:bg-white/30 border-2 border-[#A3C9F1]/20"
              >
                <div
                  className={`${feature.color} w-fit p-4 rounded-full mb-6 mx-auto transform group-hover:rotate-[90deg] transition-transform shadow-md`}
                >
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-[#5A7D9D] flex items-center justify-center gap-2">
                  {feature.emoji}
                  <span className="bg-gradient-to-r from-[#F9E265] via-[#D1A7E0] to-[#A7E0D1] bg-clip-text text-transparent">
                    {feature.title}
                  </span>
                </h2>
                <p className="text-[#5A7D9D] text-center font-medium">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16 relative">
            <div className="relative z-10 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl inline-block border-2 border-[#A3C9F1]/30">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#D1A7E0] mb-4 animate-pulse">
                Ready to Start Your Journey?
              </h3>
              <button
                onClick={() => navigate("/pokedex")}
                className="bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] hover:from-[#E5D15C] hover:to-[#C195D1] text-white cursor-pointer px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-[#F9E265]/50 flex items-center mx-auto gap-2"
              >
                <span>Explore Pokédex Now</span>
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
