
const db = () => {
    const mongoose = require("mongoose");
  
    mongoose.connect(
      "mongodb+srv://cohenshay:Pakobig1!@blogdb-tdiqu.mongodb.net/blogApp?retryWrites=true",
      { useNewUrlParser: true }
    );
  }
  module.exports = db