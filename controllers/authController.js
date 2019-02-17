const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

mongoose.connect(
    config.mongoDB_URL,
    { useNewUrlParser: true }
);

require('../models/user');
const User = mongoose.model("users");

let controller = {
    signup: (req, res) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            else {
                const { fname, lname, address, email, username } = req.body;
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fname,
                    lname,
                    address,
                    email,
                    username,
                    password: hash
                });
                user.save().then(function (result) {             
                    res.status(200).json({
                        success: 'New user has been created'
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    });
                });
            }
        });
    },
    signin: (req, res) => {
        

        User.findOne({ email: req.body.email })
            .exec()
            .then(function (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        return res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    }
                    if (result) {
                        const JWTToken = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '2h' });
                        res.cookie('jwt',JWTToken);
                        return res.status(200).json({
                            success: 'success',
                            token: JWTToken,
                            user
                        });
                    }
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                });
            })
            .catch(error => {
                console.log("signin error: "+error);
                res.status(500).json({
                    error
                });
            });;
    }
}


module.exports = controller;