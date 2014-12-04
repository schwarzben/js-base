module.exports = function(socket, board, Arduino) {
  // This module will be run after the board has been conncted
  // your arduino code can be put here
  socket.emit("Arduino ready!");
};