const mongoose = require("mongoose");
const moment = require('moment');

require('../models/privateMessage');
require('../models/user');

const privateMessage = mongoose.model("privateMessages");

let controller = {
    getConversation: async (req, res) => {

        var currentUserId = req.decoded._id;

        const { receiver } = req.query;
        let conversationId = "";
        if (currentUserId > receiver)
            conversationId = currentUserId + receiver;
        else
            conversationId = receiver + currentUserId;
        const Conversation = await privateMessage.findOne({ conversationId });
        res.status(200).send(Conversation);
    },

    savePrivateMessage: async (req, res) => {
        const { receiver, message } = req.body;
        let conversationId = "";
        var currentUserId = req.decoded._id;
        if (currentUserId > receiver)
            conversationId = currentUserId + receiver;
        else
            conversationId = receiver + currentUserId;
        let originalcoversation = await privateMessage.findOne({ conversationId });
       
        const createdAt = moment.utc();
        const users = [currentUserId, receiver]
        let msg = { message, createdAt, "sender": currentUserId }

        //concat
        if (originalcoversation) {
         
            try {
                updatedMessage = await privateMessage.updateOne({ conversationId }, {$push: {"messages": msg}},{"upsert":true})
                res.status(200).send(updatedMessage);
            } catch (error) {
                console.log("Error savePrivateMessage: ", error)
            }
        }
        //create
        else {
            let privateMessageObj = new privateMessage({
                conversationId, users, "messages": msg
            })
            const result = await privateMessageObj.save()
            res.status(200).send(result);
        }
    },
  
}

module.exports = controller;