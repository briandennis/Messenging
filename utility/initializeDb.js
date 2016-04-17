const mongoose = require('mongoose');
const session = require()

mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection;

db.on('error', () => {
  console.log('Error in connection!');
});
db.on('open', () => {
  console.log('Connected to mongo...');
});

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
