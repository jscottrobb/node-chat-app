var socket = io();

socket.on('connect', function () {
   console.log('Connected to server');

  //  socket.emit('createEmail', {
  //    from: 'kathy@gmail.com',
  //    to: 'John',
  //    text: 'Sure, why not.',
  //    createdAt: 345
  //  });
   //
  //  socket.emit('createMessage', {
  //    from: 'Kathy',
  //    to: 'John',
  //    text: 'Sure, why not.',
  //    createdAt: 345
  //  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New message',msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=Message]').val()
  }, function(data) {

  });
});
// socket.on('newEmail', function (email) {
//   console.log('New Email',email);
// });
