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
        const { subject, messageLiked, sender } = req.body;
        const currentUserId = req.decoded._id;
        const createdAt = moment.utc();

        let like = { createdAt, "sender": currentUserId }

        try {
            updatedMessage = await roomMessagesModel.updateOne({ subject, "messages.message": messageLiked, "messages.sender": sender }, { $push: { "likes": like } })
            res.status(200).send(updatedMessage);
        } catch (error) {
            console.log("Error saveLike: ", error)
        }

    },
    saveReplay: async (req, res) => {
        const { subject, messageReplayedID, replayMessage } = req.body;
        const currentUserId = req.decoded._id;
        const createdAt = moment.utc();

        let replay = { createdAt, "sender": currentUserId, "message": replayMessage }

        try {
            const messageID = mongoose.Types.ObjectId(messageReplayedID);
            updatedMessage = await roomMessagesModel.updateOne({ subject, "messages._id": messageID }, { $push: { "messages.$.replays": replay } })
            res.status(200).send(updatedMessage);
        } catch (error) {
            console.log("Error saveReplay: ", error)
        }

    },

}

module.exports = controller;