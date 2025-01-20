const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.MONGO_DB_STRING);
  await mongoose.connect(process.env.MONGO_DB_STRING);
};

module.exports = connectDB;