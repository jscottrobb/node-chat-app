const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('Message tests', () => {
   it('should return a message object with the appropriate properties', () => {
     var from = 'Admin';
     var text = 'MyText';

      var msg = generateMessage(from,text);
      expect(msg.from).toBe(from);
      expect(msg.text).toBe(text);
      expect(typeof msg.createdAt).toBe('number');
   });
});

describe('Location message tests', () => {
   it('should return a location message object with the appropriate properties', () => {
     var from = 'Admin';
     var lat = '1111';
     var long = '2222';

      var msg = generateLocationMessage(from,lat,long);

      expect(msg.from).toBe(from);
      expect(msg.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
      expect(typeof msg.createdAt).toBe('number');
   });
});
