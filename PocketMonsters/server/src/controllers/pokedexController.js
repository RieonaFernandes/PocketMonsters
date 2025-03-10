const Pokemon = require("../models/PokedexSchema");

async function fetchPokemonData(callback) {
  try {
    let query = { uid: "1" };
    const data = await Pokemon.find(query, "name weight height uid");
    // console.log(data);
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

async function getPokemonById(req, callback) {
  try {
    let query = { uid: req.id };
    const data = await Pokemon.find(query, "name weight height uid");
    // console.log(data);
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

module.exports = { fetchPokemonData, getPokemonById };
