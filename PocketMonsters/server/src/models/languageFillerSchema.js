const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COLLECTIONS } = require("../utils/constants");

const langFillerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  iso3166: { type: String, required: true },
  iso639: { type: String, required: true },
  "en-name": { type: String, required: true },
});

module.exports = mongoose.model(COLLECTIONS.Language, langFillerSchema);
