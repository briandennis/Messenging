'use strict';

var mongoose = require('mongoose');

// create schemas
var messageSchema = mongoose.Schema({
  threadId: String,
  senderId: String,
  content: String,
  time: Number
});