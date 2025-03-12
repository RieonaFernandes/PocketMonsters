const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Reusable Schema Definitions
const NamedResourceSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const AbilitySchema = new Schema({
  ability: NamedResourceSchema,
  is_hidden: { type: Boolean, required: true },
  slot: { type: Number, required: true },
});

const GameIndexSchema = new Schema({
  game_index: { type: Number, required: true },
  version: NamedResourceSchema,
});

const MoveSchema = new Schema({
  move: NamedResourceSchema,
  version_group_details: [
    {
      level_learned_at: { type: Number, required: true },
      move_learn_method: NamedResourceSchema,
      version_group: NamedResourceSchema,
    },
  ],
});

const StatSchema = new Schema({
  base_stat: { type: Number, required: true },
  effort: { type: Number, required: true },
  stat: NamedResourceSchema,
});

const TypeSchema = new Schema({
  slot: { type: Number },
  type: NamedResourceSchema,
});

const ImageSchema = new Schema({
  front_default: { type: String, required: true },
  front_shiny: { type: String },
});

const SpriteSchema = new Schema({
  back_default: { type: String },
  back_female: { type: String },
  back_shiny: { type: String },
  back_shiny_female: { type: String },
  front_default: { type: String },
  front_female: { type: String },
  front_shiny: { type: String },
  front_shiny_female: { type: String },
  other: {
    dream_world: {
      front_default: { type: String },
      front_female: { type: String },
    },
    home: {
      front_default: { type: String },
      front_female: { type: String },
      front_shiny: { type: String },
      front_shiny_female: { type: String },
    },
    official_artwork: {
      front_default: { type: String },
      front_shiny: { type: String },
    },
    showdown: {
      back_default: { type: String },
      back_female: { type: String },
      back_shiny: { type: String },
      back_shiny_female: { type: String },
      front_default: { type: String },
      front_female: { type: String },
      front_shiny: { type: String },
      front_shiny_female: { type: String },
    },
  },
  versions: {
    "generation-i": {
      "red-blue": {
        back_default: { type: String },
        back_gray: { type: String },
        back_transparent: { type: String },
        front_default: { type: String },
        front_gray: { type: String },
        front_transparent: { type: String },
      },
      yellow: {
        back_default: { type: String },
        back_gray: { type: String },
        back_transparent: { type: String },
        front_default: { type: String },
        front_gray: { type: String },
        front_transparent: { type: String },
      },
    },
    "generation-ii": {
      crystal: {
        back_default: { type: String },
        back_shiny: { type: String },
        back_shiny_transparent: { type: String },
        back_transparent: { type: String },
        front_default: { type: String },
        front_shiny: { type: String },
        front_shiny_transparent: { type: String },
        front_transparent: { type: String },
      },
      gold: {
        back_default: { type: String },
        back_shiny: { type: String },
        front_default: { type: String },
        front_shiny: { type: String },
        front_transparent: { type: String },
      },
      silver: {
        back_default: { type: String },
        back_shiny: { type: String },
        front_default: { type: String },
        front_shiny: { type: String },
        front_transparent: { type: String },
      },
    },
    "generation-iii": {
      emerald: {
        front_default: { type: String },
        front_shiny: { type: String },
      },
      "firered-leafgreen": {
        back_default: { type: String },
        back_shiny: { type: String },
        front_default: { type: String },
        front_shiny: { type: String },
      },
      "ruby-sapphire": {
        back_default: { type: String },
        back_shiny: { type: String },
        front_default: { type: String },
        front_shiny: { type: String },
      },
    },
    "generation-iv": {
      "diamond-pearl": {
        back_default: { type: String },
        back_female: { type: String },
        back_shiny: { type: String },
        back_shiny_female: { type: String },
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
      "heartgold-soulsilver": {
        back_default: { type: String },
        back_female: { type: String },
        back_shiny: { type: String },
        back_shiny_female: { type: String },
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
      platinum: {
        back_default: { type: String },
        back_female: { type: String },
        back_shiny: { type: String },
        back_shiny_female: { type: String },
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
    },
    "generation-v": {
      "black-white": {
        animated: {
          back_default: { type: String },
          back_female: { type: String },
          back_shiny: { type: String },
          back_shiny_female: { type: String },
          front_default: { type: String },
          front_female: { type: String },
          front_shiny: { type: String },
          front_shiny_female: { type: String },
        },
        back_default: { type: String },
        back_female: { type: String },
        back_shiny: { type: String },
        back_shiny_female: { type: String },
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
    },
    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
      "x-y": {
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
    },
    "generation-vii": {
      icons: {
        front_default: { type: String },
        front_female: { type: String },
      },
      "ultra-sun-ultra-moon": {
        front_default: { type: String },
        front_female: { type: String },
        front_shiny: { type: String },
        front_shiny_female: { type: String },
      },
    },
    "generation-viii": {
      icons: {
        front_default: { type: String },
        front_female: { type: String },
      },
    },
  },
});

const CrySchema = new Schema({
  latest: { type: String },
  legacy: { type: String },
});

// Main Pokémon Schema
const PokedexSchema = new Schema({
  uid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  base_experience: { type: Number, required: true },
  is_default: { type: Boolean, required: true },
  order: { type: Number, required: true },
  abilities: [AbilitySchema],
  forms: [NamedResourceSchema],
  game_indices: [GameIndexSchema],
  moves: [MoveSchema],
  species: NamedResourceSchema,
  sprites: SpriteSchema,
  stats: [StatSchema],
  types: [TypeSchema],
  weaknesses: [{ type: String }],
  type: [{ type: String }],
  images: ImageSchema,
  cries: CrySchema,
  location_area_encounters: { type: String, required: true },
});

module.exports = mongoose.model("Pokemon", PokedexSchema);
