const { POKEMON_TYPES } = require("../utils/constants");
const { BAD_REQUEST } = require("../config/errors");

async function pokedexValidator(req, res, next) {
  if (req.query?.limit)
    if (parseInt(req.query.limit) > 25)
      return next(BAD_REQUEST("Validation error: limit cannot exceed 25"));
  if (req.query?.sortBy)
    if (!["uid", "name"].includes(req.query.sortBy))
      return next(
        BAD_REQUEST("Validation error: Sorting can be done by id or by name")
      );
  if (req.query?.sortOrder)
    if (!["1", "-1"].includes(req.query.sortOrder))
      return next(
        BAD_REQUEST("Validation error: Sort order can have value 1 or -1")
      );
  if (req.query?.type)
    if (
      !req.query.type.split(",").every((item) => POKEMON_TYPES.includes(item))
    )
      return next(
        BAD_REQUEST(`Validation error: valid types are: ${POKEMON_TYPES}`)
      );
  if (req.query?.weakness)
    if (
      !req.query.weakness
        .split(",")
        .every((item) => POKEMON_TYPES.includes(item))
    )
      return next(
        BAD_REQUEST(`Validation error: valid weaknesses are: ${POKEMON_TYPES}`)
      );
  if (req.query?.minHeight)
    if (parseInt(req.query.minHeight) < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum hight value has to be greater that 0"
        )
      );
  if (req.query?.maxHeight)
    if (parseInt(req.query.maxHeight) < 0)
      return next(
        BAD_REQUEST(
          "Validation error: maximum hight value has to be greater that 0"
        )
      );
  if (req.query?.minWeight)
    if (parseInt(req.query.minWeight) < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum weight value has to be greater that 0"
        )
      );
  if (req.query?.maxWeight)
    if (parseInt(req.query.maxWeight) < 0)
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
