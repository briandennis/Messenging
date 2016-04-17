const mongoose = require('mongoose');

// create schemas
const messageSchema = mongoose.Schema({
  threadId: String,
  senderId: String,
  content: String,
  time: Number
});
