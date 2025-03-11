const { POKEMON_TYPES } = require("../utils/constants");

async function pokedexValidator(req, res, next) {
  if (req.query?.limit)
    if (parseInt(req.query.limit) > 25)
      return res.status(400).send("Validation error: limit cannot exceed 25");
  if (req.query?.sortBy)
    if (!["uid", "name"].includes(req.query.sortBy))
      return res
        .status(400)
        .send("Validation error: Sorting can be done by id or by name");
  if (req.query?.sortOrder)
    if (!["1", "-1"].includes(req.query.sortOrder))
      return res
        .status(400)
        .send("Validation error: Sort order can have value 1 or -1");
  if (req.query?.type)
    if (
      !req.query.type.split(",").every((item) => POKEMON_TYPES.includes(item))
    )
      return res
        .status(400)
        .send(`Validation error: valid types are: ${POKEMON_TYPES}`);
  if (req.query?.weakness)
    if (
      !req.query.weakness
        .split(",")
        .every((item) => POKEMON_TYPES.includes(item))
    )
      return res
        .status(400)
        .send(`Validation error: valid weaknesses are: ${POKEMON_TYPES}`);
  if (req.query?.minHeight)
    if (parseInt(req.query.minHeight) < 0)
      return res
        .status(400)
        .send("Validation error: minimum hight has to greater that 0");
  if (req.query?.maxHeight)
    if (parseInt(req.query.maxHeight) < 0)
      return res
        .status(400)
        .send("Validation error: maximum hight has to greater that 0");
  if (req.query?.minWeight)
    if (parseInt(req.query.minWeight) < 0)
      return res
        .status(400)
        .send("Validation error: minimum weight has to greater that 0");
  if (req.query?.maxWeight)
    if (parseInt(req.query.maxWeight) < 0)
      return res
        .status(400)
        .send("Validation error: maximum weight has to greater that 0");
  next();
}

module.exports = { pokedexValidator };
