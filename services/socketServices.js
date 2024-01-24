// /services/socketService.js

// Import necessary modules
const socketIO = require('socket.io');

// Function to initialize Socket.io and attach it to the Express server
exports.initializeSocketIO = (server) => {
  const io = socketIO(server);

  // Define Socket.io event handlers here

  // Example: Handle connection events
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Handle custom events
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};
