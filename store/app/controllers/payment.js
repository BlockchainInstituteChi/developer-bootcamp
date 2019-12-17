// Dependancy Declarations
var mongoose = require('mongoose');
var tx       = mongoose.model('transaction');
var util     = require('../util/confirmationHelper.js');

// Function Declarations
module.exports = {
	getAddress : function getAddress (req, res) {

		// The body of the POST request can be accessed using req.body.< variable name >
		// See getAddress() in index.js in the public/ folder for the syntax of a POST request.

		var result = "";

		if ( req.body.currency === "ETH" ) {
			result = { address: "EtherAddress" };
		} else if ( req.body.currency === "BTC" ) {
			result = { address: "BTCAddress" };
		} else {
		 	result = { address: "DefaultAddress" };
		}
		
		newTransaction( req.body.price, req.body.product, ( Math.random() * 1000 ), req.body.currency, result.address, function( err, record ) {
			
			if (record ) console.log('new pending tx created ', record);
			result.txId = record._id;

			if ( !err ) {
				return res.status(200).send(result)
			} else { 
				return res.status(200).send(err)
			}
		});

	},
	txIsPaid : function txIsPaid (req, res) {

		// this is a template function to check if a tx has been paid 
		// pass a json formatted payload like { address: < crypto address >, amount: < numeric amount > }

		console.log('searching for transactions with id', req.body.txId)

		tx.findOne({ _id: req.body.txId }, function (err, record) {
			if (!record) {
				console.log('no records found for id ', req.body.txId)
				return res.status(200).send( { success : false } );
			}
			if (err) {
				console.log('err', err);
			} else {
				console.log('record found', record);
				if ( record.status === 'paid' ) {
					console.log('Found a transaction with that ID which has been paid!')
					res.status(200).send( { success : true } );

					
				} else {
					
					res.status(200).send( { success : false } );

				}

			}
		})

	}
}


function newTransaction (amount, product, nonce, currency, address, callback ) {

	// This function demonstrates how to add a new transaction record to the mongoDB
	
	// First, populate an object with the appropriate parameters. 
	// See models/transaction.js for the appropriate syntax
	// The 'status' field can be set to either 'pending' or 'filled'

	var newTx = {
		  amount    : amount, 
		  product   : product,
		  status    : 'pending',
		  nonce     : nonce,
		  timeStamp : (new Date()).getTime(),
		  address   : address,
		  currency  : currency,
	};

	// Next, use the tx object (initialized at the top of this file) to create a new mongoDB record

	tx.create(newTx, function(err, txRecord) {
		if ( err ) {
			console.log( 'error creating new transaction ', err );
			callback( err, null );
		} else {
			console.log( '\r\n\r\nnew tx created \r\n ', txRecord );
			callback( null, txRecord );
		}
	})

	// Next, be sure to trigger a listener to watch for this transaction to be confirmed. 
	// Ethereum listeners should poll Infura for new transactions, and Bitcoin listeners will poll the local node via ZMQ

}