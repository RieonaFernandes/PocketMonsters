import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      to={`/pokemon/${pokemon.uid}`}
      // key={pokemon.uid}
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-sm text-gray-500 text-right">
        #{pokemon.uid.toString().padStart(3, "0")}
      </div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-32 h-32 object-contain"
      />
      <h3 className="text-center font-semibold capitalize mt-2">
        {pokemon.name}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {pokemon.type.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        <p>Height: {pokemon.height / 10}m</p>
        <p>Weight: {pokemon.weight / 10}kg</p>
      </div>
    </Link>
  );
}
