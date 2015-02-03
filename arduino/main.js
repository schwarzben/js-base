module.exports = function (socket, board, Arduino) {
    'use strict';
    // This module will be run after the board has been conncted
    var i, pin_cap;

    function onData() {
        // Display data (may be analog or digital)
        // DEBUG
        console.log('received data, you may inspect now');
        // console.log(arguments);
        // console.log(this); // expected to be the pin instance
        // Actually read pin data and broadcast to socket
        // TODO maybe passing the whole pin object around is overkill
        this.read((function (pin) {
            return function (value) {
                // DEBUG
                console.log("value read at pin " + pin.id);
                socket.broadcast('mydat', {'pin': pin, 'value': value});
            };
        }(this)));
    }

    for (i = 0; i < board.pins.length; i++) {
        pin_cap = board.pins[i];
        // check if pin_cap suitable
        if (pin_cap.supportedModes == false // falsy on empty array, e.g. on pin_cap 0
                || pin_cap.supportedModes.indexOf(Arduino.Pin.INPUT) === -1) {
            // pin does not support reading of values so skip it altogether
            // DEBUG
            console.log("Pin " + i + ": Not an input.")
            continue;
        }
        // set pin mode to input
        board.pinMode(i, Arduino.Pin.INPUT);
        // Pin events: high, low, data
        // see https://github.com/rwaldron/johnny-five/wiki/Pin#events
        (new Arduino.Pin(i)).on('data', onData);
    }

    /* DEBUG
    setInterval(function () {
        socket.broadcast('mydat', {allPins: board.pins, msg: '' + typeof board});
    }, 3000);
    */
    // DEBUG api
    return {
        newDings: function (what) {
            var ret;
            console.log('newDings called with "' + what + '"');
            switch (what) {
                case 1:
                    ret = {read: function (callback) {
                            callback(Math.floor(Math.random() * 256));
                        }, id: 5};
                    break;
                case 2:
                    ret = {read: function (callback) {
                            callback(Math.floor(Math.random() * 256));
                        }, id: 10};
                    break;
                default:
                    ret = {read: function (callback) {
                            callback(13);
                        }, id: 'mocky'};
            }
            onData.call(ret);
        }
    }
};