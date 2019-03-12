const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
mongoose.connect(config.mongoDB_URL, {
    useNewUrlParser: true
});

require("../models/user");
const User = mongoose.model("users");

async function jwtAdmin(req, res, next) {
    // route middleware to verify a token 


    if (req.method == "OPTIONS") {
        next();
        return null;
    }
    var token = req.headers.authorization;
    // decode token
    if (token) {
        // verifies secret and checks exp
        try {
            jwt.verify(token, config.secret, async function (err, decoded) {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    const user = await User.findById(decoded._id);
                    if (user.isAdmin) {
                        req.decoded = decoded;
                        next();
                    }
                    else {
                        return res.status(401).json({ success: false, message: 'User have no Admin privilage.' });
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }


    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}


module.exports = jwtAdmin;