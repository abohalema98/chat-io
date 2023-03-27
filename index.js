require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const hostname = "0.0.0.0";

const io = new Server(server);

// CORS-enabled
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, hostname, () => {
  
  console.log("Chat is Runining");
});
