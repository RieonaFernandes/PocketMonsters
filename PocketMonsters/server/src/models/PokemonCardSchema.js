const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common Object Schema
const ObjectSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

// Flavor Text Entry Schema
const FlavorTextEntrySchema = new Schema({
  flavor_text: { type: String, required: true },
  language: { type: ObjectSchema, required: true },
  version: { type: ObjectSchema },
});

// Pokedex Number Schema
const PokedexNumberSchema = new Schema({
  entry_number: { type: Number },
  pokedex: ObjectSchema,
});

const NamesSchema = new Schema({
  language: ObjectSchema,
  name: { type: String },
});

// Main Pokémon Schema
const PokemonCardSchema = new Schema({
  uid: { type: Number, required: true },
  name: { type: String, required: true },
  base_happiness: { type: Number },
  capture_rate: { type: Number },
  color: ObjectSchema, // color.name
  egg_groups: [ObjectSchema], // list of egg groups
  evolution_chain: { url: String }, // evolution chain URL
  evolves_from_species: ObjectSchema,
  flavor_text_entries: [FlavorTextEntrySchema], // array of flavor text entries
  gender_rate: { type: Number },
  genera: [
    {
      genus: { type: String },
      language: ObjectSchema,
    },
  ],
  generation: ObjectSchema,
  growth_rate: ObjectSchema,
  habitat: ObjectSchema,
  is_baby: { type: Boolean },
  is_legendary: { type: Boolean },
  is_mythical: { type: Boolean },
  order: { type: Number },
  pal_park_encounters: [
    {
      area: ObjectSchema,
      base_score: { type: Number },
      rate: { type: Number },
    },
  ],
  pokedex_numbers: [PokedexNumberSchema], // list of Pokedex numbers
  shape: ObjectSchema,
  varieties: [
    {
      is_default: { type: Boolean },
      pokemon: ObjectSchema, // pokemon name
    },
  ],
  names: [NamesSchema],
});

// Create and export the model
module.exports = mongoose.model("Card", PokemonCardSchema);
