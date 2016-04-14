const socket = io('http://localhost:3000');


socket.on('news', (data) => {
  const el = document.createElement('p');
  el.innerHTML = data.hello;
  document.body.appendChild(el);
  socket.emit('loaded', { my: 'data' });
});

socket.on('messages', (data) => {
  console.log(data);
  socket.emit('sentMessage', { data: 'This is my message!' });
});

socket.on('messageAdded', (data) => {
  alert(`New Message Added: ${data}`);
});
