// connect to socket
var socket = io("http://localhost:3000");

// function to get parameter from url if any
function getParameterByName(name = "token", url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// call the function to get the token from url
var token = getParameterByName();

if (token) {
  // if token is present in url then join the room
  // send token to server on base room join
  socket.emit("base", {
    token: token
  });
}

// receive message from server on token named room
socket.on(token, function (data) {
  console.log("data", data);
});

// // leave the room
// socket.emit('leave', room);

// // disconnect from socket
// socket.disconnect();
