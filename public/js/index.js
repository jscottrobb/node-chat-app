var socket = io();

socket.on('connect', function () {
   console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New message',msg);
  var formattedTime = moment(msg.createdAt).format('hh:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (msg) {
  console.log('New location message',msg);
  var formattedTime = moment(msg.createdAt).format('hh:mm a');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
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
  messageBox.val('');
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
    return alert('Unable to get location.');
  });
});

// socket.on('newEmail', function (email) {
//   console.log('New Email',email);
// });
