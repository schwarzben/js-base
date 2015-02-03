var express = require('express.io');
var server  = express().http().io();
var livereload = require('express-livereload');
var arduino = require('./arduino/main');
var repl = require('repl');

// DEBUG
var MockFirmata = require("johnny-five/test/mock-firmata");
var pins = require("johnny-five/test/mock-pins");

// enable livereload
livereload(server);

// serve static files from public
server.use(express.static(__dirname + '/browser'));

// Init the Arduino
var five = require("johnny-five");

// Connect the arduino board
try {
  //var board = new five.Board();
  // DEBUG using my own repl
  var board = new five.Board({io: new MockFirmata(), debug: false/*, repl: false*/});


  // After everything is connected, we run your arduino code
  board.on("ready", function() {
    // init arduino/index.js
    var shrimp = arduino(server.io,board,five);
    // start the server
    server.listen(3000);
    // DEBUG start repl for "event injection"
    /*
    var replServer = repl.start({
        prompt: "Oh Johnny (" + envName + ") > ",
        eval: function eval(cmd, context, filename, callback) {
            var result = 'done';
            arduino.newDings(cmd);
            callback(null, result);
        }
    });
    */
    board.repl.context.p = function (what) {
        shrimp.newDings(what);
    };
  });
} catch (e) {
  console.error("Have you connected your Arudino board?");
}
