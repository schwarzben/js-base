var express = require('express.io');
var server  = express().http().io();
var livereload = require('express-livereload');
var arduino = require('./arduino/main');
var MockFirmata = require("johnny-five/test/mock-firmata");

// enable livereload
livereload(server);

// serve static files from public
server.use(express.static(__dirname + '/browser'));

// Init the Arduino
var five = require("johnny-five");

// Connect the arduino board
try {
  //var board = new five.Board();
  var board = new five.Board({io: new MockFirmata(), debug: false, repl: false});

  // After everything is connected, we run your arduino code
  board.on("ready", function() {
    // init arduino/index.js
    arduino(server.io,board,five);
    // start the server
    server.listen(3000);
  });
} catch (e) {
  console.error("Have you connected your Arudino board?");
}
