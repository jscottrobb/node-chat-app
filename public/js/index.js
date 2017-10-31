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

socket.on('newLocationMessage', function (msg) {
  console.log('New location message',msg);
  var li = jQuery('<li></li>');
  var a  = jQuery('<a target="_blank">My Location</a>');
  a.attr('href',msg.url);
  li.text(`${msg.from}: `);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  var geo = navigator.geolocation;
  if (!geo) {
    return alert('Geo Location not supported by your browser');
  }

  geo.getCurrentPosition(function (pos) {
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    }, function(data) {

    });
  }, function () {
    return alert('Unable t get location.');
  });
});

socket.on('newLocationMessage', function (msg) {
  console.log('New message',msg);
});
// socket.on('newEmail', function (email) {
//   console.log('New Email',email);
// });
