require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const routes = require("./routes");
const http = require("http");

const env = require("./config/env");

const app = express();
const server = http.Server(app);
const io = socketio(server);
const mongoUri = env.mongoUri;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connection) => {
    const connectedUsers = {};

    io.on("connection", (socket) => {
      const { user_id } = socket.handshake.query;

      connectedUsers[user_id] = socket.id;
    });

    app.use((req, res, next) => {
      req.io = io;
      req.connectedUsers = connectedUsers;

      return next();
    });

    // app.use(cors({origin: 'http://localhost:7777'}));
    app.use(cors());
    app.use(express.json());
    app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
    app.use(routes);

    server.listen(7777);
  })
  .catch((error) => console.log(error));
