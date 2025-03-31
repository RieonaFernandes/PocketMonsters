const request = require("supertest");
const app = require("../src/app");
const Pokemon = require("../src/models/PokedexSchema");
const Card = require("../src/models/PokemonCardSchema");

const testClient = request(app);

// Direct database insertion helper
const createTestPokemon = async (pokemonData) => {
  try {
    const res = await Pokemon.create(pokemonData);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const createTestCard = async (cardData) => {
  try {
    const res = await Card.create(cardData);
    return res;
  } catch (e) {
    console.log(e);
  }
};

// Clean database helper
const clearDatabase = async () => {
  await Pokemon.deleteMany({});
};

module.exports = {
  testClient,
  createTestPokemon,
  clearDatabase,
  createTestCard,
};
