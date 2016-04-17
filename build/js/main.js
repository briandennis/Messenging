'use strict';

var socket = io('http://localhost:3000');
var Session = genSession();

// setup session info
var project = Session.project.id;
var user = Session.currentUserId;
var users = Session.users;

//initialize threads
var currentThread = project;
var threads = generateThreads(project, users, user);

//initialize message map
var messageMap = new Map();

threads.forEach(function (thread) {
  messageMap.set(thread, []);
});

socket.on('getRooms', function () {

  socket.emit('registerRooms', {
    rooms: threads,
    currentRoom: currentThread
  });
});

socket.on('messages', function (data) {
  messageMap.set(data.threadId, data.messages);
  renderMessages(messageMap.get(currentThread));
});

function generateThreads(project, users, user) {

  var threads = [];

  threads.push(project);

  users.forEach(function (currUser) {
    if (currUser.id === user) return;

    var thread = null;

    if (currUser.id < user) {
      thread = project + '.' + currUser.id + '.' + user;
    } else if (currUser.id === user) {
      alert('Fuck me.');
    } else {
      thread = project + '.' + user + '.' + currUser.id;
    }

    threads.push(thread);
  });

  return threads;
}

function renderMessages(messages) {

  messages.sort(function (a, b) {
    return a - b;
  });

  var container = document.getElementById('messages');
  container.innerHTML = '';
  messages.forEach(function (message) {

    var currUser = users.filter(function (currUser) {
      console.log('User ids: ' + currUser.id + ' ' + message.senderId);
      if (currUser.id === message.senderId) {
        return true;
      }
      return false;
    })[0];

    var p = document.createElement('p');
    p.innerHTML = currUser.firstName + ' ' + currUser.lastName + ': ' + message.content;
    container.appendChild(p);
  });

  // set scroll
  container.scrollTop = container.scrollHeight;
}

function changeThread(e) {

  // update current user
  var newThread = e.target.id;
  currentThread = newThread;

  console.log('Current thread now ' + currentThread);

  // rerender messages
  renderMessages(messageMap.get(currentThread));
}

function sendMessage(threadId, senderId, content) {
  socket.emit('newMessage', {
    threadId: threadId,
    senderId: senderId,
    content: content,
    time: new Date().getTime()
  });
  console.log('Message sent...');
}

function sendMessageHelper() {
  console.log('entering right thing...');
  var message = document.getElementById('messageBox').value;
  sendMessage(currentThread, user, message);
}

function documentInit() {

  // bind send message button
  document.getElementById('send').addEventListener('click', sendMessageHelper);

  // bind thread buttons
  var threadElements = document.getElementsByClassName('thread');
  for (var i = 0; i < threadElements.length; i++) {
    threadElements[i].addEventListener('click', changeThread);
  }
}

documentInit();