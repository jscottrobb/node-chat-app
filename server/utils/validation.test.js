const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('Validation tests', () => {

   it('should return true for a valid string', () => {
     expect(isRealString('test')).toBe(true);
   });

   it('should return false for an invalid string', () => {
     expect(isRealString(true)).toBe(false);
   });

   it('should return false for a blank string', () => {
     expect(isRealString('   ')).toBe(false);
   });
});
