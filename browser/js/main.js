// The socket object can be used to connect to the arduino/main.js
// on the server. From there you can send events to the board.

var socket = io.connect();

$(function () {
    // Pin 0-13 + a0-5 IDs for the Uno used in SVG
    var pinIds = ['_x30_.1.4.0.0.0.36', '_x30_.1.4.0.0.0.31', '_x30_.1.4.0.0.0.26',
        '_x30_.1.4.0.0.0.21', '_x30_.1.4.0.0.0.16', '_x30_.1.4.0.0.0.11',
        '_x30_.1.4.0.0.0.6', '_x30_.1.4.0.0.0.1', '_x30_.1.17.0.46',
        '_x30_.1.17.0.41', '_x30_.1.17.0.39', '_x30_.1.17.0.31', '_x30_.1.17.0.26',
        '_x30_.1.17.0.21',
        // analog pins
        '_x30_.1.1.0.1', '_x30_.1.1.0.6', '_x30_.1.1.0.14', '_x30_.1.1.0.16',
        '_x30_.1.1.0.21', '_x30_.1.1.0.26'],
        coords = [],
        bubbles = {},
        $ui = $('.duino');

    // Init interface
    $ui.load('images/arduino_Uno_Rev3_breadboard.svg', function () {
        // SVG loaded
        // get pin coordinates
        /* optional: relative to parent container
        var offset;
        offset = $(this).position();
        */
        $.each(pinIds, function () {
            // Get SVG element coordinates *CAUTION:* Relative to screen!
            var c = document.getElementById(this).getBoundingClientRect();
            coords.push(
                /*
                {
                    left: Math.round(c.left - offset.left),
                    top: Math.round(c.top - offset.top),
                }*/
                c
            );
        });
    });

    // Wait for pin events
    socket.on("mydat", function (data) {
        var whichPin, bubble;
        // data structure: {'pin': Arduino.Pin, 'value': value}
        try {
            whichPin = pinIds[data.pin.addr];
        } catch (e) {
            console.error('Pin "' + data.pin.addr + '" not found in pin map.');
            whichPin = pinIds[2];
        }
        // Create bubble or re-use existing
        bubble = bubbles[whichPin]
            || $('<div class="bubble">').css({
                //left: coords[whichPin].left - document.body.scrollLeft,
                //top: coords[whichPin].top - document.body.scrollTop
                left: coords[whichPin].left,
                top: coords[whichPin].top
            }).appendTo("body");
        bubble.text(data.value);
        // For new bubbles, make sure they get stored for re-use
        bubbles[whichPin] = bubble;
    });
});