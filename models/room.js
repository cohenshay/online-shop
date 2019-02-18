const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  admin:String,
  name: String,  
});

mongoose.model("rooms", roomSchema);
