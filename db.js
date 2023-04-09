const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://imabhishekranjan1100:newcode@cluster1.9zpmbgt.mongodb.net/techZEE?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(async () => {
      console.log("connected to the database");
    })
    .catch((e) => {
      console.log("---------------failed", e);
    });
};

module.exports = mongoDB;
