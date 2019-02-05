const mongoose = require("mongoose");
const moment = require('moment');


require('../models/room');
require('../models/user');
require('../models/message');

const Room = mongoose.model("rooms");
const Message = mongoose.model("messages");
const User = mongoose.model("users");


let controller = {
    createRoom: (req, res) => {
        //get admin from cookie
     
        const { roomName, admin } = req.body;
        const createDate = moment().valueOf();
        const permissions = [], postsID = [], messagesID = [], loggedUsers = [];
        const room = new Room({
            _id: new mongoose.Types.ObjectId(),
            roomName,
            admin,
            createDate,
            loggedUsers,
            permissions,
            postsID,
            messagesID
        });
        room.save().then(function (result) {
        
            res.status(200).json({
                success: 'New room has been created'
            });
        }).catch(error => {
            res.status(500).json({
                error
            });
        });
    },
    joinRoom: async (req, res) => {
        //get userid from cookie
        const { roomName, userId } = req.body;
        const room = await Room.findOne({ roomName });
        if (room) {
            room.loggedUsers.push(userId);
            Room.findByIdAndUpdate(userId, room, { new: true }, (err, newRoom) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send(newRoom);
            })

        }
    },
    getRoom: async (req, res) => {
        var userId = req.decoded._id;
        User.findOne({ _id: userId }).then(function (user) {

            const { roomName } = req.query;

            Room.findOne({ roomName }).then((room) => {
                var roomIns = JSON.parse(JSON.stringify(room))
                //TODO add permissions.includes(user._id)                  
                if (roomIns.permissions != null && roomIns.permissions.length > 0) {
                    return res.send(roomIns);
                }
            }).catch(error => {
                res.status(500).json({
                    error
                });
            });
        });
    },
    deleteRoom: async (req, res) => {
        var userId = req.decoded._id;
        const { roomName } = req.body;
        const room = await Room.findOne({ roomName });
        if (room.admin == userId) {
            Room.findByIdAndRemove(room._id, (err, newRoom) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send({
                    message: "Room successfully deleted",
                    id: newRoom._id
                });
            })
        }
    },   
}


module.exports = controller;