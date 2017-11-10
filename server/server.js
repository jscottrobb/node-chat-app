const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation');
const logger = require('log4js');
const publicPath = path.join(__dirname,'../public');
const express = require('express');
const {generateMessage,generateLocationMessage,generateConnectMessage} = require('./utils/message.js');
const {Users} = require('./utils/users.js');
require('./config/config');

logger.configure({
  appenders: {
    everything: {
      type: 'multiFile', base: process.env.LOG_BASE, property: 'categoryName', extension: '.log',
      maxLogSize: 10485760, backups: 3, compress: true
    }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug'}
  }
});

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

io.on('connection', (socket) => {
  logger.getLogger('system').info(generateConnectMessage(socket));
  socket.on('join',(params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      logger.getLogger('system').error('Join error processing name and room');
      return callback('Name and room are required.');
    }
    else if (!isRealString(params.room)) {
      logger.getLogger('system').error('Join error processing invalid room');
      return callback('Room is invalid');
    }
    else if (users.getUserList(params.room).includes(params.name)) {
      var msg = `Join error ${params.name} is already in room`;
      logger.getLogger('system').error(msg);
      return callback(msg);
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room',params.room));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`,params.room));

    callback();
  });

  socket.on('createMessage', (message) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
       io.to(user.room).emit('newMessage',generateMessage(user.name,message.text,user.room));
     }
  });

  socket.on('createLocationMessage', (loc) => {
    var user = users.getUser(socket.id);

     if (user && loc) {
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,loc.lat,loc.long,user.room));
     }
  });

   socket.on('disconnect',() => {
     var user = users.removeUser(socket.id);

     if(user) {
       io.to(user.room).emit('updateUserList', users.getUserList(user.room));
       io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`,user.room));
       logger.getLogger(user.room).info(`${user.name} was disconnected`);
     }
   });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  var upMsg = `App is listening on port ${port}`;
  logger.getLogger('system').info(upMsg);
  console.log(upMsg);
});

module.exports = {app};
