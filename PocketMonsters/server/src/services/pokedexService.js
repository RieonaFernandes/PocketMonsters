const pokedexController = require("../controllers/pokedexController");

async function getPokemonData(req, res) {
  pokedexController.fetchPokemonData((err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    res.json(data);
  });
}

async function getPokemonById(req, res) {
  pokedexController.getPokemonById(req.body, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data at service" });
    }
    res.json(data);
  });
}

async function getPokedex(req, res) {
  pokedexController.fetchPokedex(req.query, (err, data) => {
    if (err) {
      console.log("error===>", err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    res.json(data);
  });
}

module.exports = { getPokemonData, getPokemonById, getPokedex };
