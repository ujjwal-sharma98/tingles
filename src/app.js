const express = require("express");
const http = require("http");
const connectDB = require("./database");

const authRouter = require("./routes/auth");

require('dotenv').config()
const app = express();
const server = http.createServer(app);
app.use(express.json())

app.use("/", authRouter);


connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.DEV_PORT, () => {
      console.log(`Server is successfully listening on port ${process.env.DEV_PORT} !!!`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });