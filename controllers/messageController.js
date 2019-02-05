const mongoose = require("mongoose");
const moment = require('moment');

require('../models/message');
require('../models/user');

const Message = mongoose.model("messages");
const User = mongoose.model("users");

let controller = {
    saveRoomMessage: async (req, res) => {       
        const { text, receiver, roomName,sender } = req.body;
        const createdAt =moment().valueOf();

        let message = new Message({
            text, sender, receiver, roomName, createdAt
        })
        console.log("saveRoomMessage",message);
        try {
            message = await message.save();
            res.status(200).send(message); 
        } catch (error) {
            console.log("Error saveRoomMessage: ",error)
        }
     
    },
    getPrivateMessages: async (req, res) => {
        //TODO filters
        var userId = req.decoded._id;

        const user = await User.findById(userId);
        const messages = await Message.find({ _id: user._id });


        res.status(200).send(messages);
    },
    getRoomMessages: async (req, res) => {

        var userId = req.decoded._id;
     
        const user = await User.findById(userId);
        if (user) {
            //TODO permissions
            const roomName = req.query.roomName;        
            const messages = await Message.find({ roomName });

            res.status(200).send(messages);
        }
        else {
            res.status(500).send({
                error: "user does not registered to this room"
            })
        }
    },
}

module.exports = controller;