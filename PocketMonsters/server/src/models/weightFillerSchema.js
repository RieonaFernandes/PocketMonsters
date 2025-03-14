const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COLLECTIONS } = require("../utils/constants");

const weightFillerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  minWeight: { type: Number, required: true },
  maxWeight: { type: Number, required: true },
});

module.exports = mongoose.model(COLLECTIONS.Weight, weightFillerSchema);
