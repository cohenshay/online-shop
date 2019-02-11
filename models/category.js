const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  types: Array,
});

mongoose.model("category", categorySchema);
