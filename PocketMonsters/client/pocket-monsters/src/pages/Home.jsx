import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    // <div className="py-6 sm:py-8 md:py-12">
    //   {/* <div className="container mx-auto px-18 py-8 bg-white p-6 rounded-xl shadow-lg"> */}
    <div
      //   style={{
      //     backgroundImage: "url('/bg.png')", // Use absolute path from public directory
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
      className="home-background"
    >
      <div className="min-h-screen relative overflow-hidden rounded-xl">
        {/* Content */}
        <div className="relative z-10 min-h-screen p-4 sm:p-6">
          <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 text-black">
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 drop-shadow-lg bg-gradient-to-r from-[#F9E265] via-[#D1A7E0] to-[#A7E0D1] bg-clip-text text-transparent">
                Gotta Catch 'Em All!
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 animate-spin-slow">
                  <img
                    src="https://github.com/PokeAPI/sprites/blob/master/sprites/items/dream-world/poke-ball.png?raw=true"
                    alt="Pokéball"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <p className="text-lg sm:text-xl text-[#5A7D9D] mb-6 md:mb-8 max-w-2xl mx-auto font-medium">
                <i>
                  {" "}
                  Embark on an epic journey to become the ultimate Pokémon
                  Master!{" "}
                </i>
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                {
                  title: "Explore Pokédex",
                  icon: "🔍",
                  color: "bg-[#5A7D9D]",
                  text: "Discover over 1000 Pokémon with detailed stats, types, and evolutions!",
                  emoji: "📖",
                },
                {
                  title: "Advanced Filters",
                  icon: "⚙️",
                  color: "bg-[#D1A7E0]",
                  text: "Search by type, abilities, regions, and more to find your perfect team!",
                  emoji: "🔎",
                },
                {
                  title: "Battle Ready",
                  icon: "⚔️",
                  color: "bg-[#A7E0D1]",
                  text: "Analyze stats, weaknesses, and moves to build your ultimate battle strategy!",
                  emoji: "🛡️",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#A3C9F1]/20 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-[#A3C9F1]/30 cursor-pointer"
                >
                  <div
                    className={`${feature.color} w-fit p-4 rounded-full mb-6 mx-auto transform group-hover:rotate-[360deg] transition-transform`}
                  >
                    <span className="text-2xl text-white">{feature.icon}</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-[#5A7D9D] flex items-center justify-center gap-2">
                    {feature.emoji} {feature.title}
                  </h2>
                  <p className="text-[#5A7D9D] text-center font-medium">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"> */}
            {/* Pikachu - 1 column */}
            {/* <div className="hidden md:block md:col-span-1 flex justify-center md:justify-start animate-float">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                  className="float-right w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 transition-transform cursor-pointer"
                  alt="Pikachu"
                />
              </div> */}
            {/* CTA Section - 2 columns */}
            <div className="md:col-span-2 text-center order-first md:order-none">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#D1A7E0] mb-4 sm:mb-6 animate-pulse">
                Ready to Start Your Journey?
              </h3>
              <button
                onClick={() => navigate("/pokedex")}
                className="bg-[#F9E265] hover:bg-[#E5D15C] text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-[#F9E265]/50 flex items-center mx-auto gap-2 cursor-pointer"
              >
                <span>Explore Pokédex Now</span>
                <span className="ml-1 sm:ml-2 text-xl sm:text-2xl">➔</span>
              </button>
            </div>
            {/* Charizard - 1 column */}
            {/* <div className="hidden md:block md:col-span-1 flex justify-center md:justify-end animate-float-delayed">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                  className="float-left w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 transition-transform cursor-pointer"
                  alt="Charizard"
                />
              </div> */}
            {/* </div> */}

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#F9E265] rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
