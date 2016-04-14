const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// listen on default port
server.listen(process.env.PORT || 3000);

// serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/`);
});

const messages = [];

// emit hello world event
io.on('connection', (socket) => {
  socket.emit('messages', ['Hello!', 'Hey', 'What ya up to?']);
});

io.on('sentMessage', (socket) => {
  messages.push(socket.data);
  socket.emit('messageAdded', messages[messages.length - 1]);
});
