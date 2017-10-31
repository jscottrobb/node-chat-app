var socket = io();

socket.on('connect', function () {
   console.log('Connected to server');
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

  var messageBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val()
  }, function(data) {
    messageBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  var geo = navigator.geolocation;
  if (!geo) {
    return alert('Geo Location not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  geo.getCurrentPosition(function (pos) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    return alert('Unable t get location.');
  });
});

socket.on('newLocationMessage', function (msg) {
  console.log('New message',msg);
});
// socket.on('newEmail', function (email) {
//   console.log('New Email',email);
// });
