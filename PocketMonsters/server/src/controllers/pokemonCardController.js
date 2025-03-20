const Card = require("../models/PokemonCardSchema");
const { SERVER_ERROR, NOT_FOUND } = require("../config/errors");

async function fetchCard(req, callback) {
  try {
    const cardData = await Card.aggregate([
      { $match: { uid: parseInt(req.id) } }, // Apply filters
      {
        $project: {
          name: 1, // project only the fields that you need
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
          names: { $first: "$names" },
          evolution_chain: { $first: "$evolution_chain" },
          color: { $first: "$color" },
          generation: { $first: "$generation" },
          habitat: { $first: "$habitat" },
          flavor_text_entries: { $addToSet: "$flavor_text_entries" }, // Use addToSet to get unique values
        },
      },
      {
        $project: {
          _id: 0, // project fields that you need in the final result
          name: 1,
          names: 1,
          evolution_chain: 1,
          color: 1,
          generation: 1,
          habitat: 1,
          flavor_text_entries: 1,
        },
      },
    ]);

    // If response of the query is an empty array, no match was found for unique id.
    if (cardData.length <= 0) {
      return callback(NOT_FOUND("No pokemon found."), null);
    }

    cardData[0].names = cardData[0]?.names?.filter(
      (nameObj) => nameObj.language.name !== "ja"
    );

    let text = [];
    cardData[0]?.flavor_text_entries?.forEach((str) => {
      text.push(str.replaceAll("\n", " ").replaceAll("\f", " "));
    });
    cardData[0].flavor_text_entries = text;

    return callback(null, cardData);
  } catch (error) {
    return callback(
      SERVER_ERROR(
        "Error on fetching data. Please re-check input and try again."
      ),
      null
    );
  }
}

module.exports = { fetchCard };
