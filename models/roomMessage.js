const mongoose = require("mongoose");
const { Schema } = mongoose;





const likesSchema = new Schema({
    sender: String,
    createdAt: Date,
});

const messageSchema = new Schema({
    cons:String,
    pros:String,
    createdAt:Date,
    username:String,
    sender:String,
    likes: [likesSchema],
    disLikes: [likesSchema],
});


const roomMessageSchema = new Schema({
    messages: [messageSchema],
    subject: String,
});


mongoose.model("roomMessages", roomMessageSchema);
