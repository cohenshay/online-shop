const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  audience: String,
  name: String,
  sport:String,
  price: String,
  mainImagePath: String,
  image1Path: String,
  image2Path: String,
  image3Path: String,
  category: String,
  amount: Number,
  brand: String,
  color: String,
  description: String,
  size: String,
  type: String,
});

mongoose.model("items", itemSchema);
