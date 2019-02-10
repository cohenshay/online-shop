const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const path = require("path");
const multer  =   require('multer');
mongoose.connect(config.mongoDB_URL, {
  useNewUrlParser: true
});

require("../models/user");
const User = mongoose.model("users");
require("../models/item");
const Item = mongoose.model("items");
var upload = multer({ storage : storage }).any();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(__dirname, '../app/public/images/items/'));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

let controller = {
  addItem: (req, res) => {
    const {
      audience,
      category,
      itemName,
      amount,
      brand,
      color,
      description,
      price,
      size,
      type,
      itemPrice,
    } = req.body;

    let {
      itemMainImg,
      itemImg1,
      itemImg2,
      itemImg3
    } = req.files;
debugger
console.log("path",path.resolve(__dirname, '../app/public/images/items/'))
    upload(req,res,function(err) {
      if(err) {
        return res.end("Error uploading file.");
      }   
        res.end("File is uploaded");
    });
   const files = {itemMainImg,itemImg1,itemImg2,itemImg3};
    files.forEach(element => {
      
    });
    itemMainImg.mv(
      `app/public/images/items/${itemMainImg.name}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
        else {
          const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            audience,
            category,
            name: itemName,
            price: itemPrice,
            amount,
            brand,
            color,
            description,
            price,
            size,
            type,
            mainImagePath:itemMainImg? itemMainImg.name:null,
            image1Path:itemImg1? itemImg1.name:null,
            image2Path:itemImg2? itemImg2.name:null,
            image3Path:itemImg3? itemImg3.name:null
          });

          item
            .save()
            .then(function (result) {
              res.status(200).json({
                success: "New item has been created",
              });
            })
            .catch(error => {
              res.status(500).json({
                error,
              });
            });
        }
      },
    )



  },
};

module.exports = controller;