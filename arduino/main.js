module.exports = function (socket, board, Arduino) {
    'use strict';
    // This module will be run after the board has been conncted
    var i, pin_cap;

    function handleDigitalData(pin) {
        
    }

    function handleAnalogData(pin) {
        
    }

    function onData() {
        // Display data (may be analog or digital)
        // DEBUG
        console.log('received data, you may inspect now');
        console.log(arguments);
        console.log(this); // expected to be the pin instance
        switch (this.type) {
            case 'analog':
                handleAnalogData(this);
                break;
            case 'digital':
                handleDigitalData(this);
                break;
        }
    }

    for (i = 0; i < board.pins.length; i++) {
        pin_cap = board.pins[i];
        // check if pin_cap suitable
        if (pin_cap.supportedModes == false // falsy on empty array, e.g. on pin_cap 0
                || pin_cap.supportedModes.indexOf(Arduino.Pin.INPUT) === -1) {
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
};