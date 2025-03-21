const Type = require("../models/typeFillerSchema");
const Weight = require("../models/weightFillerSchema");
const Height = require("../models/heightFillerSchema");
const Language = require("../models/languageFillerSchema");
const { SERVER_ERROR, NOT_FOUND } = require("../config/errors");

async function fetchFillers(req, callback) {
  try {
    const data = await (req === "Type"
      ? Type.find({}, { _id: 0 })
      : req === "Weight"
      ? Weight.find({}, { _id: 0 })
      : req === "Height"
      ? Height.find({}, { _id: 0 })
      : Language.find({}, { _id: 0 }));

    // If response of the query is an empty array, no match was found for unique id.
    if (data.length <= 0) {
      return callback(NOT_FOUND("No filler found."), null);
    }

    return callback(null, data);
  } catch (error) {
    return callback(
      SERVER_ERROR("Error on fetching data. Please try again."),
      null
    );
  }
}

module.exports = { fetchFillers };
