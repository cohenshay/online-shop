const mongoose = require("mongoose");
const moment = require('moment');

require('../models/roomMessage');
require('../models/user');

const roomMessagesModel = mongoose.model("roomMessages");

let controller = {
    getRoomMessages: async (req, res) => {

        const { subject } = req.query;

        const roomMessages = await roomMessagesModel.findOne({ subject });
        if (roomMessages)
            res.status(200).send(roomMessages.messages);
        else
            res.status(200).send([]);
    },

    saveRoomMessage: async (req, res) => {
        const { subject, cons, pros, username } = req.body;
        const currentUserId = req.decoded._id;
        const createdAt = moment.utc();

        let msg = { cons, pros, createdAt, "sender": currentUserId, username, "replays": [], likes: [] }
        const originalRoomMessage = await roomMessagesModel.findOne({ subject })

        //concat
        if (originalRoomMessage) {

            try {
                updatedMessage = await roomMessagesModel.updateOne({ subject }, { $push: { "messages": msg } }, { new: true })
                res.status(200).send(updatedMessage);
            } catch (error) {
                console.log("Error saveRoomMessage: ", error)
            }
        }
        //create
        else {
            let roomMessageObj = new roomMessagesModel({
                "messages": [msg],
                subject
            })
            const result = await roomMessageObj.save()
            res.status(200).send(result);
        }
    },
    saveLike: async (req, res) => {
        const { subject, messageId, type } = req.body;
        const currentUserId = req.decoded._id;
        const createdAt = moment.utc();

        let like = { createdAt, "sender": currentUserId }
        if (type == "like") {
            try {
                updatedMessage = await roomMessagesModel.updateOne({ subject, "messages._id": messageId }, { $push: { "messages.$.likes": like } })
                res.status(200).send(updatedMessage);
            } catch (error) {
                console.log("Error saveLike: ", error)
            }
        }
        else if (type == "disLike") {
            try {
                updatedMessage = await roomMessagesModel.updateOne({ subject, "messages._id": messageId }, { $push: { "messages.$.disLikes": like } })
                res.status(200).send(updatedMessage);
            } catch (error) {
                console.log("Error saveDisLike: ", error)
            }
        }

    },
    getLikes: async (req, res) => {
        const currentUserId = req.decoded._id;
      
        try {
            //TODO bring also the message itself
            const find = await roomMessagesModel.find({ "messages.sender": currentUserId },"subject messages.likes messages.disLikes");
            console.log("like", find)
            
            res.status(200).send(find);
        } catch (error) {
            console.log("Error saveLike: ", error)
        }
    },

}

module.exports = controller;