import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg rounded-b-xl border-b-4 border-[#F9E265]">
      <ul className="flex space-x-8 justify-center py-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-[#F9E265] to-[#D1A7E0] text-white font-bold shadow-md"
                  : "text-[#5A7D9D] hover:text-[#D1A7E0] hover:bg-[#A3C9F1]/20"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pokedex"
            className={({ isActive }) =>
              `px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-[#D1A7E0] to-[#A7E0D1] text-white font-bold shadow-md"
                  : "text-[#5A7D9D] hover:text-[#D1A7E0] hover:bg-[#A3C9F1]/20"
              }`
            }
          >
            Pokédex
          </NavLink>
        </li>
      </ul>
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F9E265] via-[#D1A7E0] to-[#A7E0D1] animate-border-pulse" /> */}
    </nav>
  );
}
