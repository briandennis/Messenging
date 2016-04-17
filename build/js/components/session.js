'use strict';

function getInfo() {
  // hard code test values
  var session = {};

  session.project = { id: 'testProject', title: 'Dream Team' };
  session.users = [];

  function User(id, fname, lname) {
    this.id = id;
    this.firstName = fname;
    this.lastName = lname;
  }

  session.users.push(new User('testUser0', 'Brian', 'Dennis'));
  session.users.push(new User('testUser1', 'Jake', 'Dex'));
  session.users.push(new User('testUser2', 'Elon', 'Musk'));
  session.users.push(new User('testUser3', 'Albert', 'Einstein'));

  return session;
}

function generateSession(projectId) {
  // get project info from server
  return getInfo(projectId);
}

module.exports = {
  generateSession: generateSession
};