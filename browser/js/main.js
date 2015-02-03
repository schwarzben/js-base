// The socket object can be used to connect to the arduino/main.js
// on the server. From there you can send events to the board.

var socket = io.connect();

$(function(){
  	var $text = $("<div>").appendTo("body");
	socket.on("mydat", function (data) {
        //console.log(data.allPins);
        $text.text('Pin ' + data.pin.id + ' received value ' + data.value);
    });
});