const express = require("express");
const router = express.Router();
const pokedexService = require("../services/pokedexService");
const validator = require("../utils/validator");

router.get("/", pokedexService.getPokemonData);
router.get("/details", pokedexService.getPokemonById);
router.get("/pokedex", validator.pokedexValidator, pokedexService.getPokedex);

module.exports = router;
