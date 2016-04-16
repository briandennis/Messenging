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

Message.find( (err, messages) => {
  if(err){
    console.log('Error fetching messages!');
    return;
  }
  console.log(`Fetched Messages! Here they are: ${messages.toString()}`);
});

////////// Socket Code //////////

// emit hello world event
io.on('connection', (socket) => {

  socket.emit

  // handle new sent message
  socket.on('newMessage', (data) => {

    // create new message
    var newMessage = new Message({
      senderId: data.senderId,
      content: data.content,
      time: new Date().getTime()
    });

    // store new message in db
    newMessage.save((er, newMessage) => {
      if (er){
        console.log(`Error: ${er}`);
        return false;
      }
      console.log( `Saved new message: ${newMessage.content}`);
    });

    // updat

  });
});
