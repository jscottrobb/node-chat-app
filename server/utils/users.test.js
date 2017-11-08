const expect = require('expect');

const {Users} = require('./users');

describe('Users tests', () => {
  var users;

  beforeEach(function() {
     users = new Users();
     users.addUser('222','Denise','pool room');
     users.addUser('777','Dan','pool room');
     users.addUser('333','Elaine','brookdale');
  });

  it('Should add a user', () => {
    users.addUser('111','Scott','pool room');
    var user = users.getUser('111');

    expect(user).toBeTruthy();
    expect(user.id).toBe('111');
    expect(user.name).toBe('Scott');
    expect(user.room).toBe('pool room');
  });

  it('Should remove a user', () => {
    users.removeUser('222');
    expect(users.getUser('222')).toBeFalsy();
    var cnt = users.users.filter((user) => user.room === 'pool room').length;
    expect(cnt).toBe(1);
  });

  it('Should not remove a user', () => {
    users.removeUser('444');
    expect(users.users.length).toBe(3);
  });

  it('Should get a user', () => {
    var user = users.getUser('222');

    expect(user).toBeTruthy();
    expect(user.id).toBe('222');
    expect(user.name).toBe('Denise');
    expect(user.room).toBe('pool room');
  });

  it('Should not get a user', () => {
    var user = users.getUser('666');

    expect(user).toBeFalsy();
  });

  it('Should get a user list', () => {
    var userList = users.getUserList('pool room');
    expect(userList).toBeTruthy();
    expect(userList.length).toBe(2);

    userList = users.getUserList('brookdale');
    expect(userList).toBeTruthy();
    expect(userList.length).toBe(1);
  });

  it('Should not get a user list', () => {
    var userList = users.getUserList('unknown');
    expect(userList).toBeTruthy();
    expect(userList.length).toBe(0);
  });
});
