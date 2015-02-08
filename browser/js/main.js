// The socket object can be used to connect to the arduino/main.js
// on the server. From there you can send events to the board.

var socket = io.connect();

$(function(){
    // Pin 0-13 + a0-5 IDs for the Uno used in SVG
    var pinIds = ['_x30_.1.4.0.0.0.36', '_x30_.1.4.0.0.0.31', '_x30_.1.4.0.0.0.26',
        '_x30_.1.4.0.0.0.21', '_x30_.1.4.0.0.0.16', '_x30_.1.4.0.0.0.11',
        '_x30_.1.4.0.0.0.6', '_x30_.1.4.0.0.0.1', '_x30_.1.17.0.46',
        '_x30_.1.17.0.41', '_x30_.1.17.0.39', '_x30_.1.17.0.31', '_x30_.1.17.0.26',
        '_x30_.1.17.0.21',
        // analog pins
        '_x30_.1.1.0.1', '_x30_.1.1.0.6', '_x30_.1.1.0.14', '_x30_.1.1.0.16',
        '_x30_.1.1.0.21', '_x30_.1.1.0.26'];
    var coords = [];
    var bubbles = {};

  	// Init interface
    var $ui = $('.duino');
    $ui.load('images/arduino_Uno_Rev3_breadboard.svg', function () {
        // SVG loaded
        // get pin coordinates
        // relative to parent container
        var offset;
        offset = $(this).position();
        $.each(pinIds, function () {
            var c = document.getElementById(this).getBoundingClientRect();
            coords.push(/*{
                left: Math.round(c.left - offset.left),
                top: Math.round(c.top - offset.top),
            }*/c);
        });
    });

    // Wait for pin events
	socket.on("mydat", function (data) {
        // data structure: {'pin': pin, 'value': value}
        try {
            var whichPin = pinIds[data.pin.addr];
        } catch (e) {
            console.error('Pin "' + data.pin.addr + '" not found in pin map.');
            var whichPin = pinIds[2];
        }
        var bubble = bubbles[data.pin.addr]
            || $('<div class="bubble">').css({
                //left: coords[data.pin.addr].left - document.body.scrollLeft,
                //top: coords[data.pin.addr].top - document.body.scrollTop
                left: coords[data.pin.addr].left,
                top: coords[data.pin.addr].top
            }).appendTo("body");
        bubble.text(data.value);
        bubbles[data.pin.addr] = bubble;
    });
});