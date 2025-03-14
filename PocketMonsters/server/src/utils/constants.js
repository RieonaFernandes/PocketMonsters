const POKEMON_TYPES = [
  "bug",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
  "dragon",
  "dark",
  "stellar",
  "unknown",
  "shadow",
];

const ERROR_TYPES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

let COLLECTIONS = {};
if (process.env.ENV === "local" || process.env.ENV === "dev") {
  COLLECTIONS = {
    Types: "types_fillers",
    Weight: "weight_fillers",
    Height: "height_fillers",
    Language: "language_fillers",
    Card: "cards",
    Pokemon: "pokemons",
  };
}

module.exports = { POKEMON_TYPES, ERROR_TYPES, COLLECTIONS };
