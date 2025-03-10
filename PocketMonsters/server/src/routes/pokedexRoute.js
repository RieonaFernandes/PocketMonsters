const express = require("express");
const router = express.Router();
const pokedexService = require("../services/pokedexService");

router.get("/", pokedexService.getPokemonData);
router.get("/details", pokedexService.getPokemonById);

module.exports = router;
