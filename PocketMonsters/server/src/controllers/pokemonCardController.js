const Card = require("../models/PokemonCardSchema");
const { SERVER_ERROR, BAD_REQUEST } = require("../config/errors");

async function fetchCard(req, callback) {
  try {
    const cardData = await Card.aggregate([
      { $match: { uid: parseInt(req.id) } }, // Apply filters
      {
        $project: {
          name: 1, // Include the name in the result, you can add other fields if needed
          names: 1,
          evolution_chain: 1,
          color: 1,
          generation: 1,
          habitat: 1,
          flavor_text_entries: {
            $map: {
              input: {
                $filter: {
                  input: "$flavor_text_entries", // The array to filter
                  as: "entry", // Alias for each item in the array
                  cond: { $eq: ["$$entry.language.name", "en"] }, // Condition to check if the language is "en"
                },
              },
              as: "entry", // Alias for each item in the filtered array
              in: "$$entry.flavor_text", // Extract the flavor_text value from the filtered items
            },
          },
        },
      },
      {
        $unwind: "$flavor_text_entries", // Unwind the array to make each flavor_text an individual document
      },
      {
        $group: {
          _id: "$_id", // Group by the Pokémon _id
          name: { $first: "$name" }, // Keep the name (or other fields) for the result
          flavor_text_entries: { $addToSet: "$flavor_text_entries" }, // Use addToSet to get unique values
        },
      },
      {
        $project: {
          name: 1, // Include the name in the final result
          flavor_text_entries: 1, // Include the unique flavor_text_entries
        },
      },
    ]);
    if (cardData.length <= 0) {
      return callback(BAD_REQUEST("No pokemon found."), null);
    }

    return callback(null, cardData);
  } catch (error) {
    return callback(
      SERVER_ERROR(
        "Error on fetching data. Please recheck input and try again."
      ),
      null
    );
  }
}

module.exports = { fetchCard };
