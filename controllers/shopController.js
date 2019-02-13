const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const path = require("path");
const multer = require("multer");
const moment = require('../helpers/moment');
const crypto = require('crypto');
const mime = require('mime');
mongoose.connect(config.mongoDB_URL, {
  useNewUrlParser: true
});

require("../models/user");
const User = mongoose.model("users");
require("../models/item");
const Item = mongoose.model("items");
require("../models/category");
const Category = mongoose.model("category");

var upload = multer({ storage: storage }).any();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(__dirname, `../app/public/images/items/`));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + "-" + Date.now());
  }
});

let controller = {
  addItem: (req, res) => {
    const {
      audience,
      category,
      sport,
      itemName,
      amount,
      brand,
      color,
      description,
      price,
      size,
      type,
      itemPrice
    } = req.body;

    let itemMainImg = req.files[0];
    let itemImg1 = req.files[1];
    let itemImg2 = req.files[2];
    let itemImg3 = req.files[3];
    debugger
    console.log("files", req.files);
    upload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      } else {
        console.log("itemMainImg", itemMainImg);
        const item = new Item({
          _id: new mongoose.Types.ObjectId(),
          audience,
          category,
          sport,
          name: itemName,
          price: itemPrice,
          amount,
          brand,
          color,
          description,
          price,
          size,
          type,
          mainImagePath: itemMainImg ? itemMainImg.originalname.substring(0, itemMainImg.originalname.indexOf(".")) + "_" + moment(new Date()).format("DD_MM_YYYY") + '.' + mime.getExtension(itemMainImg.mimetype) : null,
          image1Path: itemImg1 ? itemImg1.originalname.substring(0, itemImg1.originalname.indexOf(".")) + "_" + moment(new Date()).format("DD_MM_YYYY") + '.' + mime.getExtension(itemImg1.mimetype) : null,
          image2Path: itemImg2 ? itemImg2.originalname.substring(0, itemImg2.originalname.indexOf(".")) + "_" + moment(new Date()).format("DD_MM_YYYY") + '.' + mime.getExtension(itemImg2.mimetype) : null,
          image3Path: itemImg3 ? itemImg3.originalname.substring(0, itemImg3.originalname.indexOf(".")) + "_" + moment(new Date()).format("DD_MM_YYYY") + '.' + mime.getExtension(itemImg3.mimetype) : null,
        });
        item
          .save()
          .then(function (result) {
            res.status(200).send(result);
          })
          .catch(error => {
            res.status(500).send(error);
          });
      }
    });
  },
  getAllItems: async (req, res) => {
    const items = await Item.find({});
    res.status(200).send(items);
  },
  getAllCategories: async (req, res) => {
    const categories = await Category.find({});
    res.status(200).send(categories);
  },
  filterTypes: async (req, res) => {
    const filters = req.body.types;
    if (filters && filters.length > 0) {
      const items = await Item.find({ type: { $in: filters } });
      res.status(200).send(items);
    }
    else {
      const allItems = await Item.find({});
      res.status(200).send(allItems);
    }
  }
};

module.exports = controller;
