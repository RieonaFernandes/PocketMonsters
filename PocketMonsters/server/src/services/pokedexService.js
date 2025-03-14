const pokedexController = require("../controllers/pokedexController");
const cardController = require("../controllers/pokemonCardController");
const async = require("async");

async function getPokedex(req, res) {
  pokedexController.fetchPokedex(req.body, (err, data) => {
    if (err) {
      return res.status(err?.statusCode || 500).json(err);
    }
    return res.json(data);
  });
}

async function getCard(req, res) {
  async.parallel(
    {
      pokemonData: function (parallelCallback) {
        pokedexController.fetchDetails(req.params, (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
      cardData: function (parallelCallback) {
        cardController.fetchCard(req.params, (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
    },
    function (err, results) {
      if (err) {
        console.log(err);
        return res.status(err?.statusCode || 500).json(err);
      }
      return res.json(results);
    }
  );
}

module.exports = { getPokedex, getCard };
