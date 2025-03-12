const express = require("express");
const router = express.Router();
const pokedexService = require("../services/pokedexService");
const validator = require("../middlewares/validator");

// pokedex API
router.get("/pokedex", validator.pokedexValidator, pokedexService.getPokedex);

// get pokemon card API
router.get("/pokedex/:id", validator.cardValidator, pokedexService.getCard);

module.exports = router;
