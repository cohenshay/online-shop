const mongoose = require("mongoose");
const { Schema } = mongoose;


const messageSchema = new Schema({
    message:String,
    createdAt:Date,
    sender:String
  });

const privateMessageSchema = new Schema({
  conversationId: String,
  users:[{ type: Schema.Types.ObjectId, ref: 'users' }],
  messages:[messageSchema],
});

mongoose.model("privateMessages", privateMessageSchema);