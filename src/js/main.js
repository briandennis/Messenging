const socket = io('http://localhost:3000');
const Session = genSession();

// setup session info
const project = Session.project.id;
const user = Session.currentUserId;
const users = Session.users;

//initialize threads
let currentThread = project;
const threads = generateThreads(project, users, user);

//initialize message map
const messageMap = new Map();

threads.forEach( (thread) => {
  messageMap.set(thread, []);
});


socket.on('getRooms', () => {

  socket.emit('registerRooms', {
    rooms: threads,
    currentRoom: currentThread
  });
});

socket.on('messages', (data) => {
  messageMap.set(data.threadId, data.messages);
  renderMessages(messageMap.get(currentThread));
});

function generateThreads( project, users, user){

  const threads = [];

  threads.push(project);

  users.forEach( (currUser) => {
    if(currUser.id === user) return;

    let thread = null;

    if(currUser.id < user) {
      thread = `${project}.${currUser.id}.${user}`;
    }
    else if (currUser.id === user){
      alert('Fuck me.');
    }
    else{
      thread = `${project}.${user}.${currUser.id}`;
    }

    threads.push(thread)

  });

  return threads;
}

function renderMessages(messages){

  messages.sort( (a,b) => {
    return a - b;
  });

  var container = document.getElementById('messages');
  container.innerHTML = '';
  messages.forEach( (message) => {

    var currUser = users.filter( (currUser) => {
      console.log('User ids: ' + currUser.id + ' ' + message.senderId);
      if(currUser.id === message.senderId){
        return true;
      }
      return false;
    })[0];

    var p = document.createElement('p');
    p.innerHTML = `${currUser.firstName} ${currUser.lastName}: ${message.content}`;
    p.className = 'message';
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

function sendMessageHelper () {
  console.log('entering right thing...');
  var message = document.getElementById('messageBox').value;
  sendMessage(currentThread, user, message);
}

function documentInit(){

  // bind send message button
  document.getElementById('send').addEventListener('click',sendMessageHelper);

  // bind thread buttons
  var threadElements = document.getElementsByClassName('thread');
  for(var i = 0; i < threadElements.length; i++) {
    threadElements[i].addEventListener('click', changeThread);
  }
}

documentInit();
