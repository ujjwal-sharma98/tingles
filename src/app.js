const http = require("http");
const express = require("express");
const app = express();
const connectDB = require("./database");
const cookieParser = require("cookie-parser");

require('dotenv').config()

app.use(express.json())
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

const server = http.createServer(app);

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