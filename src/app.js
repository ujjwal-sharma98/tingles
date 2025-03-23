const http = require("http");
const express = require("express");
const app = express();
const connectDB = require("./database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { initializeSocket } = require("./utils/socket");

require('dotenv').config()
require("./crons/pendingRequests");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

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