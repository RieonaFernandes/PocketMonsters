const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COLLECTIONS } = require("../utils/constants");

const heightFillerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  minHeight: { type: Number, required: true },
  maxHeight: { type: Number, required: true },
});

module.exports = mongoose.model(COLLECTIONS.Height, heightFillerSchema);
