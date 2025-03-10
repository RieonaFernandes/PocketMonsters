const mongoose = require("mongoose");

const PokedexSchema = new mongoose.Schema({
  name: String,
  height: Number,
  uid: Number,
  weight: Number,
  base_experience: Number,
  is_default: Boolean,
  order: Number,
  abilities: [
    {
      ability: {
        name: String,
        url: String,
      },
      is_hidden: Boolean,
      slot: Number,
    },
  ],
  forms: [
    {
      name: String,
      url: String,
    },
  ],
  game_indices: [
    {
      game_index: Number,
      version: {
        name: String,
        url: String,
      },
    },
  ],
  moves: [
    {
      move: {
        name: String,
        url: String,
      },
      version_group_details: [
        {
          level_learned_at: Number,
          move_learn_method: {
            name: String,
            url: String,
          },
          version_group: {
            name: String,
            url: String,
          },
        },
      ],
    },
  ],
  species: {
    name: String,
    url: String,
  },
  sprites: {
    back_default: String,
    back_female: String,
    back_shiny: String,
    back_shiny_female: String,
    front_default: String,
    front_female: String,
    front_shiny: String,
    front_shiny_female: String,
    other: {
      dream_world: {
        front_default: String,
        front_female: String,
      },
      home: {
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String,
      },
      official_artwork: {
        front_default: String,
        front_shiny: String,
      },
      showdown: {
        back_default: String,
        back_female: String,
        back_shiny: String,
        back_shiny_female: String,
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String,
      },
    },
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: String,
          back_gray: String,
          back_transparent: String,
          front_default: String,
          front_gray: String,
          front_transparent: String,
        },
        yellow: {
          back_default: String,
          back_gray: String,
          back_transparent: String,
          front_default: String,
          front_gray: String,
          front_transparent: String,
        },
      },
      "generation-ii": {
        crystal: {
          back_default: String,
          back_shiny: String,
          back_shiny_transparent: String,
          back_transparent: String,
          front_default: String,
          front_shiny: String,
          front_shiny_transparent: String,
          front_transparent: String,
        },
        gold: {
          back_default: String,
          back_shiny: String,
          front_default: String,
          front_shiny: String,
          front_transparent: String,
        },
        silver: {
          back_default: String,
          back_shiny: String,
          front_default: String,
          front_shiny: String,
          front_transparent: String,
        },
      },
      "generation-iii": {
        emerald: {
          front_default: String,
          front_shiny: String,
        },
        "firered-leafgreen": {
          back_default: String,
          back_shiny: String,
          front_default: String,
          front_shiny: String,
        },
        "ruby-sapphire": {
          back_default: String,
          back_shiny: String,
          front_default: String,
          front_shiny: String,
        },
      },
      "generation-iv": {
        "diamond-pearl": {
          back_default: String,
          back_female: String,
          back_shiny: String,
          back_shiny_female: String,
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
        "heartgold-soulsilver": {
          back_default: String,
          back_female: String,
          back_shiny: String,
          back_shiny_female: String,
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
        platinum: {
          back_default: String,
          back_female: String,
          back_shiny: String,
          back_shiny_female: String,
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
      },
      "generation-v": {
        "black-white": {
          animated: {
            back_default: String,
            back_female: String,
            back_shiny: String,
            back_shiny_female: String,
            front_default: String,
            front_female: String,
            front_shiny: String,
            front_shiny_female: String,
          },
          back_default: String,
          back_female: String,
          back_shiny: String,
          back_shiny_female: String,
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
      },
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
        "x-y": {
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
      },
      "generation-vii": {
        icons: {
          front_default: String,
          front_female: String,
        },
        "ultra-sun-ultra-moon": {
          front_default: String,
          front_female: String,
          front_shiny: String,
          front_shiny_female: String,
        },
      },
      "generation-viii": {
        icons: {
          front_default: String,
          front_female: String,
        },
      },
    },
  },
  stats: [
    {
      base_stat: Number,
      effort: Number,
      stat: {
        name: String,
        url: String,
      },
    },
  ],
  types: [
    {
      slot: Number,
      type: {
        name: String,
        url: String,
      },
    },
  ],
  cries: {
    latest: String,
    legacy: String,
  },
  location_area_encounters: String,
});

module.exports = mongoose.model("Pokemon", PokedexSchema);
