const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// listen on default port
server.listen(process.env.PORT || 3000);

// serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/`);
});

// emit hello world event
io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
