const mongoose = require("mongoose");
const moment = require('moment');

require('../models/privateMessage');
require('../models/user');

const privateMessage = mongoose.model("privateMessages");


let controller = {
    getUserMessages: async (req, res) => {

        var currentUserId = req.decoded._id;
        let conversations =await privateMessage.find({ users: currentUserId }, { users: 1 }).populate('users');
        

        res.status(200).send(conversations);
    }
}


module.exports = controller;