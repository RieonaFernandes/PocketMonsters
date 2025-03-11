const Pokemon = require("../models/PokedexSchema");
const { SERVER_ERROR } = require("../config/errors");

async function fetchPokemonData(callback) {
  try {
    let query = { uid: "1" };
    const data = await Pokemon.find(query, "name weight height uid");
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

async function getPokemonById(req, callback) {
  try {
    let query = { uid: req.id };
    const data = await Pokemon.find(query, "name weight height uid");

    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

async function fetchPokedex(query, callback) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "uid",
      sortOrder = 1, //"desc" ? -1 : 1;
      search,
      type,
      weakness,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    } = query;

    const filter = {};

    if (type) filter.type = { $all: type.split(",") };
    if (weakness) filter.weaknesses = { $all: weakness.split(",") };
    if (minHeight) filter.height = { $gte: parseInt(minHeight) };
    if (maxHeight)
      filter.height = { ...filter.height, $lte: parseInt(maxHeight) };
    if (minWeight) filter.weight = { $gte: parseInt(minWeight) };
    if (maxWeight)
      filter.weight = { ...filter.weight, $lte: parseInt(maxWeight) };
    if (search)
      Number.isInteger(parseInt(search))
        ? (filter.uid = parseInt(search))
        : (filter.name = { $regex: new RegExp(search, "i") });

    let skip = (page - 1) * limit;

    const data = await Pokemon.aggregate([
      { $match: filter }, // Apply filters
      {
        $project: {
          name: 1,
          height: 1,
          uid: 1,
          weight: 1,
          image: "$images.front_default", // Extract as a string
          type: {
            $map: {
              input: "$type",
              as: "t",
              in: "$$t",
            },
          },
        },
      },
      { $sort: { [sortBy]: parseInt(sortOrder) } }, // Sort dynamically
      { $skip: skip },
      { $limit: parseInt(limit) }, // Limit results
    ]);

    const count = await Pokemon.countDocuments(filter);

    let result = {
      data: data,
      metadata: {
        total_pages: Math.ceil(count / limit),
        current_page: parseInt(page),
        offset: (parseInt(page) - 1) * limit,
        limit: parseInt(limit),
        docs_in_page: data?.length,
      },
    };

    callback(null, result);
  } catch (err) {
    console.log(err);
    callback(
      SERVER_ERROR(
        "Error on fetching data. Please recheck input and try again."
      ),
      null
    );
  }
}

module.exports = { fetchPokemonData, getPokemonById, fetchPokedex };
