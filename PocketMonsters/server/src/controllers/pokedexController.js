const Pokemon = require("../models/PokedexSchema");
const { SERVER_ERROR, NOT_FOUND } = require("../config/errors");

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

    if (type) filter.type = { $all: type.split(",") }; // converts 'type' from string to an array and filters documents where the 'type' field contains all the values specified in the 'type' parameter.
    if (weakness) filter.weaknesses = { $all: weakness.split(",") }; // converts 'weakness' from string to an array and filters documents where the 'weakness' field contains all the values specified in the 'weakness' parameter.
    if (minHeight) filter.height = { $gte: minHeight }; // filters documents where the minimum height is greater than or equals to the 'minHeight' parameter.
    if (maxHeight) filter.height = { ...filter.height, $lte: maxHeight }; // filters documents where the height is less than or equals to the 'maxHeight' parameter and also includes any other filter applied on height.
    if (minWeight) filter.weight = { $gte: minWeight }; // filters documents where the minimum weight is greater than or equals to the 'minWeight' parameter.
    if (maxWeight) filter.weight = { ...filter.weight, $lte: maxWeight }; // filters documents where the weight is less than or equals to the 'maxWeight' parameter and also includes any other filter applied on weight.
    if (search)
      Number.isInteger(search)
        ? (filter.uid = search)
        : (filter.name = { $regex: new RegExp(search, "i") }); // search is can be done based on the pokemon id or name. If number, then search by 'uid', else search by name.

    let skip = (page - 1) * limit; // the number of documents to skip

    const data = await Pokemon.aggregate([
      { $match: filter }, // Apply filters
      {
        $project: {
          name: 1, // project only the fields that you need
          height: 1,
          uid: 1,
          weight: 1,
          image: "$images.front_default", // Extract as a string
          type: 1,
          _id: 0,
        },
      },
      { $sort: { [sortBy]: sortOrder } }, // Sort dynamically
      { $skip: skip }, // skip the first specified number of documents after the filter is applied
      { $limit: limit }, // Limit results
    ]);

    // If response of the query is an empty array, no match was found for the filter
    if (data.length <= 0) {
      return callback(
        NOT_FOUND("No pokemon found with the specified attributes."),
        null
      );
    }

    // Get total count of the documents for the filter.
    const count = await Pokemon.countDocuments(filter);

    // format the result
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

    return callback(null, result);
  } catch (err) {
    return callback(
      SERVER_ERROR(
        "Error on fetching data. Please re-check input and try again."
      ),
      null
    );
  }
}

async function fetchDetails(req, callback) {
  try {
    const data = await Pokemon.aggregate([
      { $match: { uid: parseInt(req.id) } }, // Apply filters
      {
        $project: {
          _id: 0, // project only the fields that you need
          name: 1,
          height: 1,
          uid: 1,
          weight: 1,
          image: "$images.front_default",
          gif: "$sprites.other.showdown.front_default",
          type: 1,
          weaknesses: 1,
          stats: 1,
          abilities: {
            $map: {
              input: "$abilities",
              as: "ability",
              in: "$$ability.ability.name",
            },
          },
          moves: {
            $map: {
              input: "$moves",
              as: "moves",
              in: "$$moves.move.name",
            },
          },
        },
      },
    ]);

    // If response of the query is an empty array, no match was found for unique id.
    if (data.length <= 0) {
      return callback(NOT_FOUND("No pokemon found."), null);
    }
    return callback(null, data);
  } catch (error) {
    return callback(
      SERVER_ERROR(
        "Error on fetching data. Please re-check input and try again."
      ),
      null
    );
  }
}

module.exports = {
  fetchPokedex,
  fetchDetails,
};
