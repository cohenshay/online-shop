const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fname: String,
  lname: String,
  address: String,
  email: String,
  username: String,
  password: String,
});

mongoose.model("users", userSchema);
