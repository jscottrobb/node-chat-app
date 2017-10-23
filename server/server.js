const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const express = require('express');

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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage',{
      from: 'Admin',
      text: 'New user in the chat room',
      createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage',{
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });
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
