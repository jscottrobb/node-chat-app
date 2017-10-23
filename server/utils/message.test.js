const expect = require('expect');
const {generateMessage} = require('./message');

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
