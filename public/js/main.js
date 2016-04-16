const socket = io('http://localhost:3000');

const thread = 'testThread';
const user = 'testUser';

socket.on('news', (data) => {
  const el = document.createElement('p');
  el.innerHTML = data.hello;
  document.body.appendChild(el);
  socket.emit('loaded', { my: 'data' });
});


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
