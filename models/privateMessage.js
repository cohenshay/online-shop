const mongoose = require("mongoose");
const { Schema } = mongoose;


const messageSchema = new Schema({
    message:String,
    createdAt:Date,
    sender:String
  });

const privateMessageSchema = new Schema({
  conversationId: String,
  users:Array,
  messages:[messageSchema],
});

mongoose.model("privateMessages", privateMessageSchema);