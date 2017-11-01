const moment = require('moment');

var date = moment();

date.add(10, 'days');

console.log(date.format('hh:mm a'));
