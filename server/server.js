const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const express = require('express');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
   console.log('Connected to user');

  //  socket.emit('newEmail', {
  //    from: 'John@gmail.com',
  //    to: 'Kathy',
  //    text: 'Want to go to a movie',
  //    createdAt: 123
  //  });
  //
  //  socket.on('createEmail', (email) => {
  //    console.log('Created email',email);
  //  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user in the chat room'));

  socket.on('createMessage', (message, callback) => {

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('From server');
  });

  socket.on('createLocationMessage', (loc, callback) => {

    io.emit('newLocationMessage',generateLocationMessage('Admin',loc.lat,loc.long));
    callback('From server');
  });

   socket.on('disconnect',() => {
     console.log('User was disconnected');
   });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = {app};
