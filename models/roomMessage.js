const mongoose = require("mongoose");
const { Schema } = mongoose;

const basicMessageSchema = new Schema({
    message:String,
    createdAt:Date,
    sender:String
});

const replaysSchema = new Schema({
    messages: [basicMessageSchema],
});

const likesSchema = new Schema({
    sender: String,
    createdAt: Date,
});

const messageSchema = new Schema({
    message:String,
    createdAt:Date,
    sender:String,
    replays: [replaysSchema],
    likes: [likesSchema],
});


const roomMessageSchema = new Schema({
    messages: [messageSchema],
    subject: String,
});


mongoose.model("roomMessages", roomMessageSchema);
