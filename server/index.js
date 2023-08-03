var express = require("express");
var app = express();
app.use(require("cors")());

var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*"
  }
});

http.listen(3000, function () {
  console.log("Successfully Connected Node Server");

  io.on("connection", function (socket) {
    // Receive from client
    socket.on("base", function (data) {
      console.log("Initialize TOKEN=" + data.token + " verification");

      // Send to the unique client
      socket.emit(data.token, {
        message: "Hello from server"
      });
    });
  });
});
