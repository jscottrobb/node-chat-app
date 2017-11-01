var moment = require('moment');

var generateMessage = (from, text) => {
  console.log(`from: ${from}, text: ${text}`);

  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from, lat, long) => {
  console.log(`from: ${from}, latitude: ${lat}, longitude: ${long}`);
  var url = `https://www.google.com/maps?q=${lat},${long}`;

  return {
    from,
    url,
    createdAt: moment().valueOf()
  }
};

module.exports = {generateMessage, generateLocationMessage};
