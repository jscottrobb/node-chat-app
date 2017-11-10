const moment = require('moment');
const logger = require('log4js');

var generateMessage = (from, text, room) => {
  logger.getLogger(room).info(`From: ${from}, text: ${text}`);

  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from, lat, long, room) => {
  logger.getLogger(room).info(`From: ${from}, latitude: ${lat}, longitude: ${long}`);
  var url = `https://www.google.com/maps?q=${lat},${long}`;

  return {
    from,
    url,
    createdAt: moment().valueOf()
  }
};

var generateConnectMessage = (socket) => {
  var host = socket.handshake.headers.host;
  var params = socket.handshake.headers.referer.split('?')[1].split('&');

  return `Connected to ${params[0]} ${params[1]} on host ${host}`;
}

module.exports = {generateMessage, generateLocationMessage,generateConnectMessage};
