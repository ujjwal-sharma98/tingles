const express = require("express");

const app = express();

const http = require("http");

const server = http.createServer(app);

server.listen(3002, () => {
    console.log("Server is successfully listening on port 3002 !!!");
});