const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const multer = require("multer");
const passwordHash = require('password-hash');

mongoose.connect(
    config.mongoDB_URL,
    { useNewUrlParser: true }
);
mongoose.set('useFindAndModify', false);

var upload = multer({ storage: storage }).any();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, `../app/public/images/items/`));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

require('../models/user');
const User = mongoose.model("users");

let controller = {
    signup: (req, res) => {
        var hashedPassword = passwordHash.generate(req.body.password);


        const { fname, lname, address, email, username, image } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            fname,
            lname,
            address,
            email,
            username,
            image,
            password: hashedPassword,
            isAdmin: false
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


    },
    signin: (req, res) => {


        User.findOne({ email: req.body.email })
            .exec()
            .then(function (user) {
                if (!passwordHash.verify(req.body.password, user.password)) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                else {
                    const JWTToken = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '2h' });
                    res.cookie('jwt', JWTToken);
                    return res.status(200).json({
                        success: 'success',
                        token: JWTToken,
                        user
                    });
                }
            })
            .catch(error => {
                console.log("signin error: " + error);
                res.status(500).json({
                    error
                });
            });;
    },
    updateUser: async (req, res) => {



        const { fname, lname, address, email, username, password, prevEmail } = req.body;

        var hashedPassword = passwordHash.generate(password);

        let user = {};
        if (req.files[0]) {
            const imagePath = "/images/users/" + req.files[0].originalname;
            user = {
                fname, lname, address, email, username, "password": hash, image: imagePath, isAdmin: false
            }
            upload(req, res, function (err) {
                if (err) {
                    console.log("Error uploading file");
                    return res.end("Error uploading file.");
                }
            });
        }
        if (password) {

            if (user == {}) { //case user did not update image
                user = {
                    fname, lname, address, email, username, "password": hashedPassword, isAdmin: false
                }
            }
            const newUser = await User.findOneAndUpdate({ email: prevEmail }, { $set: { ...user } }, { new: true, useFindAndModify: false });
            res.status(200).json({
                "success": 'success',
                "user": newUser
            });


        }
        else {
            user = {
                fname, lname, address, email, username, isAdmin: false
            }
            const newUser = await User.findOneAndUpdate({ email: prevEmail }, { $set: { ...user } }, { new: true, useFindAndModify: false });
            res.status(200).json({
                "success": 'success',
                "user": newUser
            });

        }
    },
    checkprivilage: async (req, res) => {
        //this route goes throw jwtAdmin to check if the user is admin     
        res.status(200).send("Allowed");

    },
}


module.exports = controller;