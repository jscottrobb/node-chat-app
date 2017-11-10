var socket = io();

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

socket.on('connect', function () {
   console.log('Connected to server');
   var params = jQuery.deparam(window.location.search);
   var room = toTitleCase(params.room) + ' Chat Room';

   document.getElementById("chat__main__hdr").innerHTML = room;

   socket.emit('join', params, (err) => {
     if (err) {
        alert(err);
        window.location.href = '/';
     }
     else {
        console.log('No error on join into ' + room);
     }
   });
});

socket.on('updateUserList', function (users) {

  var ol = jQuery('<ol></ol>');

  for (let i=0; i < users.length; i++) {
    ol.append(jQuery('<li></li>').text(users[i]));
  }

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageBox = jQuery('[name=message]');

  socket.emit('createMessage', {
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

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMsg = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMsgHeight = newMsg.innerHeight();
  var lastMsgHeight = newMsg.prev().innerHeight();
  var height = clientHeight + scrollTop + newMsgHeight + lastMsgHeight;

  if (height >= scrollHeight) {
     messages.scrollTop(scrollHeight);
  }
};
