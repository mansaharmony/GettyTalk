const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle WebRTC signaling events
  socket.on('offer', (offer) => {
    // Broadcast offer to other clients
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    // Broadcast answer to other clients
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    // Broadcast ICE candidate to other clients
    socket.broadcast.emit('ice-candidate', candidate);
  });

  // Handle chat messaging events
  socket.on('message', (message) => {
    // Broadcast message to other clients
    socket.broadcast.emit('message', message);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server listening on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
