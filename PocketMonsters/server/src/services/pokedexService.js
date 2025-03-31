const pokedexController = require("../controllers/pokedexController");
const cardController = require("../controllers/pokemonCardController");
const fillerController = require("../controllers/pokedexFillerController");
const async = require("async");

async function getPokedex(req, res) {
  pokedexController.fetchPokedex(req.body, (err, data) => {
    if (err) {
      return res.status(err?.code || 500).json(err);
    }
    return res.json(data);
  });
}

async function getCard(req, res) {
  // added async parallel for parallel execution (comparatively faster)
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
        return res.status(err?.code || 500).json(err);
      }
      return res.json(results);
    }
  );
}

async function getFiller(req, res) {
  async.parallel(
    {
      type: function (parallelCallback) {
        fillerController.fetchFillers("Type", (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
      weight: function (parallelCallback) {
        fillerController.fetchFillers("Weight", (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
      height: function (parallelCallback) {
        fillerController.fetchFillers("Height", (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
      language: function (parallelCallback) {
        fillerController.fetchFillers("Language", (err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
      count: function (parallelCallback) {
        pokedexController.stats((err, data) => {
          if (err) {
            return parallelCallback(err, null);
          }
          return parallelCallback(null, data);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(err?.code || 500).json(err);
      }
      return res.json(results);
    }
  );
}

module.exports = { getPokedex, getCard, getFiller };
