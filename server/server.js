const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname,'../public');
const express = require('express');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {Users} = require('./utils/users.js');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

io.on('connection', (socket) => {
   console.log('Connected to user');

  socket.on('join',(params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }
    else if (!isRealString(params.room)) {
      return callback('Room is invalid');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message) => {
    io.emit('newMessage',generateMessage(message.from,message.text));
  });

  socket.on('createLocationMessage', (loc) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',loc.lat,loc.long));
  });

   socket.on('disconnect',() => {
     var user = users.removeUser(socket.id);

     if(user) {
       io.to(user.room).emit('updateUserList', users.getUserList(user.room));
       io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
       console.log(`${user.name} was disconnected`);
     }
   });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = {app};
