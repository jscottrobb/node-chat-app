class Users {
  constructor () {
    this.users = [];
  }

  removeUser(id) {
    var index = this.users.findIndex(function(o) {
         return o.id === id;
    });

    var user = this.users[index];

    if (index !== -1) {
      this.users.splice(index, 1);
    }

    return user;
  }

  addUser(id, name, room) {
    var user = {id, name, room};

    this.users.push(user);

    return user;
  }

  getUser(id) {
    return this.users.find((user) => {
      return user['id'] === id;
    });
  }

  getUserList(room) {
    var users = this.users.filter((user) => user['room'] === room);
    return users.map((user) => user.name);
  }
}

module.exports = {Users};
