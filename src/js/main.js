const socket = io('http://localhost:3000');

// create dummy session info
const thread = 'testThread';
const user = 'testUser';
const others = ['testUser1', 'testUser2', 'testUser3', 'testUser4'];
var currentRoom = thread;
var chatThreads = [];

socket.on('getRooms', () => {

  // calculate rooms
  var rooms = [];

  rooms.push(thread);

  others.forEach( (other) => {

    var roomName = null;

    if(other < user) {
      roomName = `${thread}.${other}.${user}`;
    }
    else if (other === user){
      alert('Fuck me.');
    }
    else{
      roomName = `${thread}.${user}.${other}`;
    }

    rooms.push(roomName);
    chatThreads.push({name: roomName});

  });

  socket.emit('registerRooms', {
    rooms: rooms,
    currentRoom: currentRoom
  });
});

socket.on('messages', (data) => {
  let messages = data.messages;
  messages.sort( (a,b) => {
    return a - b;
  });
  renderMessages(messages);
});

function renderMessages(messages){
  var container = document.getElementById('messages');
  container.innerHTML = '';
  messages.forEach( (message) => {
    var p = document.createElement('p');
    p.innerHTML = message.senderId + ': ' + message.content;
    container.appendChild(p);
  });

  // set scroll
  container.scrollTop = container.scrollHeight;
}

function changeThread(e) {

  // update current user
  var newRoom = e.target.id;
  if(newRoom === 'testUser1'){
    newRoom = `${thread}.${user}.testUser1`;
  }
  else if (newRoom === 'testUser2'){
    newRoom = `${thread}.${user}.testUser2`;
  }
  currentRoom = newRoom;
  console.log(currentRoom);

  // rerender messages
  socket.emit('changeRoom', { currentRoom: currentRoom});
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
  sendMessage(thread, user, message);
}

document.getElementById('send').addEventListener('click',sendMessageHelper);

var threads = document.getElementsByClassName('thread');
for(var i = 0; i < threads.length; i++){
  threads[i].addEventListener('click', changeThread);
}
