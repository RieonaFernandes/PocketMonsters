const { POKEMON_TYPES } = require("../utils/constants");
const { BAD_REQUEST } = require("../config/errors");

async function pokedexValidator(req, res, next) {
  if (req.body?.limit) {
    if (typeof req.body.limit !== "number" || req.body?.limit > 25)
      return next(BAD_REQUEST("Validation error: Invalid limit"));
  }
  if (req.body?.sortBy)
    if (!["uid", "name"].includes(req.body.sortBy))
      return next(
        BAD_REQUEST("Validation error: Sorting can be done by id or by name")
      );
  if (req.body?.page <= 0) {
    console.log("throw error");
    return next(BAD_REQUEST("Validation error: Invalid page request."));
  }
  if (req.body?.sortOrder)
    if (![1, -1].includes(req.body.sortOrder))
      return next(
        BAD_REQUEST("Validation error: Sort order can have value 1 or -1")
      );
  if (req.body?.type)
    if (
      typeof req.body.type !== "string" ||
      !req.body.type.split(",").every((item) => POKEMON_TYPES.includes(item))
    )
      return next(
        BAD_REQUEST(`Validation error: valid types are: ${POKEMON_TYPES}`)
      );
  if (req.body?.weakness)
    if (
      typeof req.body.weakness !== "string" ||
      !req.body.weakness
        .split(",")
        .every((item) => POKEMON_TYPES.includes(item))
    )
      return next(
        BAD_REQUEST(`Validation error: valid weaknesses are: ${POKEMON_TYPES}`)
      );
  if (req.body?.minHeight)
    if (typeof req.body.minHeight !== "number" || req.body.minHeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum height value has to be a positive number"
        )
      );
  if (req.body?.maxHeight) {
    if (typeof req.body.maxHeight !== "number" || req.body.maxHeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: maximum height value has to be a positive number"
        )
      );
  }
  if (req.body?.minWeight)
    if (typeof req.body.minWeight !== "number" || req.body.minWeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: minimum weight value has to be a positive number"
        )
      );
  if (req.body?.maxWeight)
    if (typeof req.body.maxWeight !== "number" || req.body.maxWeight < 0)
      return next(
        BAD_REQUEST(
          "Validation error: maximum weight value has to be a positive number"
        )
      );
  if (req.body?.search) {
    let pattern = /[^a-zA-Z0-9 ]/;
    if (pattern.test(req.body?.search)) {
      return next(BAD_REQUEST("Validation error: Invalid search request."));
    }
  }
  next();
}

async function cardValidator(req, res, next) {
  const regex = /^[0-9]+$/;
  if (!regex.test(req.params.id))
    return next(BAD_REQUEST("Validation error: invalid input"));
  next();
}

module.exports = { pokedexValidator, cardValidator };
