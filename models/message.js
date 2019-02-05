const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: String,
  sender:String,
  receiver:String,
  createdAt:Date,
  roomName:String
});

mongoose.model("messages", messageSchema);
