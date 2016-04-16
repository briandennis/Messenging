const socket = io('http://localhost:3000');

const thread = 'testThread';
const user = 'testUser';

socket.on('news', (data) => {
  const el = document.createElement('p');
  el.innerHTML = data.hello;
  document.body.appendChild(el);
  socket.emit('loaded', { my: 'data' });
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
