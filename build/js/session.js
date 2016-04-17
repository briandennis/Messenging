'use strict';

var genSession = function genSession() {
  return {
    project: {
      id: 'testProject',
      projectName: 'Time Machine'
    },
    users: [{ id: 'testUser0', firstName: 'Brian', lastName: 'Dennis' }, { id: 'testUser1', firstName: 'Jake', lastName: 'Dex' }, { id: 'testUser2', firstName: 'Elon', lastName: 'Musk' }, { id: 'testUser3', firstName: 'Albert', lastName: 'Einstein' }],
    currentUserId: 'testUser0'
  };
};