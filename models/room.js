const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: String,  
});

mongoose.model("rooms", roomSchema);
