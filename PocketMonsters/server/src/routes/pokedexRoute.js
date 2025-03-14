const express = require("express");
const router = express.Router();
const pokedexService = require("../services/pokedexService");
const validator = require("../middlewares/validator");

// filler API
/** GET Methods */
/**
 * @openapi
 * /api/v1/pokedex/fillers:
 *   get:
 *     summary: Get fillers data including height, weight, type, and language.
 *     description: Retrieve various filler attributes such as height, weight, type, and language from the Pokedex.
 *     tags:
 *       - Pokedex
 *     responses:
 *       200:
 *         description: Successfully fetched fillers data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 height:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "small"
 *                       minWeight:
 *                         type: integer
 *                         example: 0
 *                       maxWeight:
 *                         type: integer
 *                         example: 500
 *                       id:
 *                         type: integer
 *                         example: 1
 *                 weight:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "small"
 *                       minHeight:
 *                         type: integer
 *                         example: 0
 *                       maxHeight:
 *                         type: integer
 *                         example: 10
 *                       id:
 *                         type: integer
 *                         example: 1
 *                 type:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "normal"
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       url:
 *                         type: string
 *                         example: "https://pokeapi.co/api/v2/type/1/"
 *                 language:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       iso3166:
 *                         type: string
 *                         example: "jp"
 *                       iso639:
 *                         type: string
 *                         example: "ja"
 *                       name:
 *                         type: string
 *                         example: "ja-Hrkt"
 *                       en-name:
 *                         type: string
 *                         example: "Japanese"
 *       404:
 *         description: No filler found.
 *       500:
 *         description: Error on fetching data. Please try again.
 */
router.get("/pokedex/fillers", pokedexService.getFiller);

// pokedex API
/**
 * @openapi
 * '/api/v1/pokedex':
 *   get:
 *     summary: Get a list of Pokémon with filters
 *     description: Retrieve Pokémon data with pagination, search, sorting, and filters.
 *     tags:
 *       - Pokedex
 *     parameters:
 *       - in: body
 *         name: page
 *         schema:
 *           type: object
 *           required:
 *              - page
 *           properties:
 *             page:
 *                type: integer
 *                example: 1
 *                description: Page number for pagination.
 *             limit:
 *                type: integer
 *                example: 10
 *                description: Number of Pokémon per page.
 *             sortBy:
 *                type: string
 *                example: name
 *                enum: ['name', 'uid']
 *                description: Field to sort by (can have 'uid' or 'name').
 *             sortOrder:
 *                type: integer
 *                enum: [1, -1]
 *                example: 1
 *                description: Sort order (1 for ascending, -1 for descending).
 *             minHeight:
 *                type: integer
 *                example: 7
 *                description: Minimum height of the Pokémon.
 *             maxHeight:
 *                type: integer
 *                example: 700
 *                description: Maximum height of the Pokémon.
 *             minWeight:
 *                type: integer
 *                example: 18
 *                description: Minimum weight of the Pokémon.
 *             maxWeight:
 *                type: integer
 *                example: 1700
 *                description: Maximum weight of the Pokémon.
 *             weakness:
 *                type: string
 *                example: ground,rock,grass,fire
 *                description: Weaknesses to filter by (comma-separated values).
 *             type:
 *                type: string
 *                example: bug
 *                description: Filter Pokémon by type (comma-separated values).
 *             search:
 *                type: string
 *                example: ki
 *                description: Search Pokémon by name or their unique id (uid)(case insensitive).
 *     responses:
 *       200:
 *         description: A list of Pokémon matching the criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: bulbasaur
 *                       height:
 *                         type: number
 *                         example: 7
 *                       image:
 *                          type: string
 *                          example: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
 *                       weight:
 *                         type: number
 *                         example: 69
 *                       type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["grass", "poison"]
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     total_pages:
 *                       type: integer
 *                       example: 1
 *                     current_page:
 *                       type: integer
 *                       example: 1
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     docs_in_page:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Validation error. Sorting can be done by id or by name.
 *       404:
 *         description: No pokemon found with the specified attributes.
 *       500:
 *         description: Error on fetching data. Please re-check input and try again.
 */
router.get("/pokedex", validator.pokedexValidator, pokedexService.getPokedex);

// pokemon card API
/**
 * @openapi
 * /api/v1/pokedex/{id}:
 *   get:
 *     summary: Get Pokémon details by ID.
 *     description: Retrieve details of a single Pokémon from Pokédex, using its unique ID.
 *     tags:
 *       - Pokedex
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Pokémon unique identity number.
 *     responses:
 *       200:
 *         description: Pokémon details including card data and stats.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokemonData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "charmeleon"
 *                       height:
 *                         type: number
 *                         example: 11
 *                       uid:
 *                         type: integer
 *                         example: 5
 *                       weight:
 *                         type: number
 *                         example: 190
 *                       type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["fire"]
 *                       weaknesses:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["ground", "rock", "water"]
 *                       stats:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             base_stat:
 *                               type: integer
 *                               example: 80
 *                             effort:
 *                               type: integer
 *                               example: 1
 *                             stat:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "speed"
 *                                 url:
 *                                   type: string
 *                                   example: "https://pokeapi.co/api/v2/stat/6/"
 *                       image:
 *                         type: string
 *                         example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
 *                       gif:
 *                         type: string
 *                         example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/5.gif"
 *                       abilities:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["blaze", "solar-power"]
 *                       moves:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["mega-punch", "fire-punch", "thunder-punch"]
 *                 cardData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "charmeleon"
 *                       names:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             language:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "ja-Hrkt"
 *                                 url:
 *                                   type: string
 *                                   example: "https://pokeapi.co/api/v2/language/1/"
 *                             name:
 *                               type: string
 *                               example: "リザード"
 *                       evolution_chain:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             example: "https://pokeapi.co/api/v2/evolution-chain/2/"
 *                       color:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "red"
 *                           url:
 *                             type: string
 *                             example: "https://pokeapi.co/api/v2/pokemon-color/8/"
 *                       generation:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "generation-i"
 *                           url:
 *                             type: string
 *                             example: "https://pokeapi.co/api/v2/generation/1/"
 *                       habitat:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "mountain"
 *                           url:
 *                             type: string
 *                             example: "https://pokeapi.co/api/v2/pokemon-habitat/4/"
 *                       flavor_text_entries:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws."
 *                           - "Tough fights could excite this Pokémon. When excited, it may breathe out bluish-white flames."
 *       400:
 *         description: Validation error. Sorting can be done by id or by name.
 *       404:
 *         description: No pokemon found with the specified attributes.
 *       500:
 *         description: Error on fetching data. Please re-check input and try again.
 */
router.get("/pokedex/:id", validator.cardValidator, pokedexService.getCard);

module.exports = router;
