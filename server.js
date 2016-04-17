const app = require('express')(),
   server = require('http').Server(app),
 mongoose = require('mongoose'),
       io = require('socket.io')(server);

console.log('Spinning up...');

////////// Server Code //////////

// listen on default port
server.listen(process.env.PORT || 3000);

// serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/`);
});

////////// Mongo Code //////////

// initiate mongoose connection
mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection;

db.on('error', () => {
  console.log('Error in connection!');
});
db.on('open', () => {
  console.log('Connected to mongo...');
});

// create schemas
const messageSchema = mongoose.Schema({
  senderId: String,
  content: String,
  time: Number
});

const Message = mongoose.model('Message', messageSchema);

const threadSchema = mongoose.Schema({
  threadId: String,
  messages: [messageSchema]
});

const Thread = mongoose.model('Thread', threadSchema);

////////// Socket Code //////////

// emit hello world event
io.on('connection', (socket) => {

  // request socket room registration
  socket.emit('getRooms');

  // handle room response
  socket.on('registerRooms', (data) => {
    data.rooms.forEach((room) => {
      console.log('Trying to join room ' + room);
      socket.join(room);
      console.log(`User joined room ${room}`);

      // get thread and send messages
      Thread.findOne({threadId: room}, (err, thread) => {
        if (err){
          console.log('Thread error!');
          return;
        }
        console.log('Thread found: ' + thread.threadId);

        io.to(data.currentRoom).emit('messages', { threadId: thread.threadId, messages: thread.messages });
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
  });

  // handle new sent message
  socket.on('newMessage', (data) => {

    // create new message
    var newMessage = new Message({
      senderId: data.senderId,
      content: data.content,
      time: new Date().getTime()
    });

    // get thread and add message to it
    Thread.findOne({threadId: data.threadId}, (err, thread) => {
      if (err){
        console.log('Thread error!');
        return;
      }

      // add message to thread
      thread.messages.push(newMessage);

      // save thread
      thread.save( (err, thread) => {

        if(err){
          console.log('Error saving message!');
          return false;
        }

        console.log('Saved message...');
        socket.emit('messages', { threadId: thread.threadId, messages: thread.messages });
      });
    });
  });
});
