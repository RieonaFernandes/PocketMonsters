const { POKEMON_TYPES } = require("../utils/constants");
const { BAD_REQUEST } = require("../config/errors");

// validate input provided first
async function pokedexValidator(req, res, next) {
  if (req.body?.limit)
    if (req.body.limit > 25)
      return next(BAD_REQUEST("Validation error: limit cannot exceed 25"));
  if (req.body?.sortBy)
    if (!["uid", "name"].includes(req.body.sortBy))
      return next(
        BAD_REQUEST("Validation error: Sorting can be done by id or by name")
      );
  if (req.body?.sortOrder)
    if (![1, -1].includes(req.body.sortOrder))
      return next(
        BAD_REQUEST("Validation error: Sort order can have value 1 or -1")
      );
  if (req.body?.type)
    if (!req.body.type.split(",").every((item) => POKEMON_TYPES.includes(item)))
      return next(
        BAD_REQUEST(`Validation error: valid types are: ${POKEMON_TYPES}`)
      );
  if (req.body?.weakness)
    if (
      !req.body.weakness
        .split(",")
        .every((item) => POKEMON_TYPES.includes(item))
    )
      return next(
        BAD_REQUEST(`Validation error: valid weaknesses are: ${POKEMON_TYPES}`)
      );
  if (req.body?.minHeight)
    if (req.body.minHeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum hight value has to be greater that 0"
        )
      );
  if (req.body?.maxHeight)
    if (req.body.maxHeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: maximum hight value has to be greater that 0"
        )
      );
  if (req.body?.minWeight)
    if (req.body.minWeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum weight value has to be greater that 0"
        )
      );
  if (req.body?.maxWeight)
    if (req.body.maxWeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: maximum weight value has to be greater that 0"
        )
      );
  next();
}

async function cardValidator(req, res, next) {
  const regex = /^[0-9]+$/;
  if (!regex.test(req.params.id))
    return next(BAD_REQUEST("Validation error: invalid input"));
  next();
}

module.exports = { pokedexValidator, cardValidator };
