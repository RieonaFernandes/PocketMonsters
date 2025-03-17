import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${
                isActive ? "font-bold underline" : ""
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
              `text-white hover:text-blue-200 ${
                isActive ? "font-bold underline" : ""
              }`
            }
          >
            Pokédex
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
