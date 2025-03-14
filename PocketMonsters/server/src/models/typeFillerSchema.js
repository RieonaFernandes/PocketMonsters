const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COLLECTIONS } = require("../utils/constants");

const typeFillerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model(COLLECTIONS.Types, typeFillerSchema);
