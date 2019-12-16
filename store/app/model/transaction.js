// Import Dependancies
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Mongoose Schema - add any additional data points here
var txSchema = new Schema ({
  amount    : String, 
  product   : String,
  status    : String,
  nonce     : String,
  timeStamp : Number,
  address   : String,
  currency  : String,
});

module.exports = mongoose.model('transaction', txSchema);