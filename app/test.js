var mongoose = require('mongoose');
require('./model/transaction.js');
var tx       = mongoose.model('transaction');
var util     = require('./util/confirmationHelper.js');



// Set up the db
var mongoUri = 'mongodb://localhost/node';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var newTx = {
	  amount    : 123.00, 
	  product   : "1",
	  status    : 'pending',
	  nonce     : ( Math.random() * 1000 ),
	  timeStamp : new Date(),
	  address   : "1234567890abcdefghijklmnopqrstuvwxyz",
	  currency  : "Bitcoin",
};
console.log('tx', newTx)

// Next, use the tx object (initialized at the top of this file) to create a new mongoDB record

tx.create(newTx, function(err, txRecord) {
	console.log('starting?')
	if ( err ) {
		console.log( 'error creating new transaction ', err );
		
	} else {
		console.log( '\r\n\r\nnew tx created \r\n ', txRecord );
		
	}
	console.log('done?')
})


tx.find({ address : "1234567890abcdefghijklmnopqrstuvwxyz" }, function (err, record) {
	if (err ) {
		console.log('err', err)
	} else {
		console.log( 'record found for address', record );
	}
});
