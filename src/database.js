const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Connecting DB...")
  await mongoose.connect(process.env.MONGO_DB_STRING);
};

module.exports = connectDB;