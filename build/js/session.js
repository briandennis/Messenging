'use strict';

function GenerateSession(projectId) {
  // get project info from server
  return getInfo(projectId);
}

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

  users.push(new User('testUser0', 'Brian', 'Dennis'));
  users.push(new User('testUser1', 'Jake', 'Dex'));
  users.push(new User('testUser2', 'Elon', 'Musk'));
  users.push(new User('testUser3', 'Albert', 'Einstein'));

  return session;
}

module.exports = {
  getSession: GenerateSession
};