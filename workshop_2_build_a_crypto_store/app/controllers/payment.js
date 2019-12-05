// Dependancy Declarations
var mongoose = require('mongoose');
var tx       = mongoose.model('transaction');
var util     = require('../util/confirmationHelper.js');
var lndConnect = require('./helpers/lnd-connect.js');

// Function Declarations
module.exports = {
	getAddress : async function getAddress (req, res) {
		// The body of the POST request can be accessed using req.body.< variable name >
		// See getAddress() in index.js in the public/ folder for the syntax of a POST request.

		if ( req.body.currency === "Ethereum" ) {
			var address = { address: "0x931D387731bBbC988B312206c74F77D004D6B84b" };
		} else if ( req.body.currency === "Bitcoin" ) {
			var address = { address: "1andreas3batLhQa2FawWjeyjCqyBzypd" };
		} else if ( req.body.currency === "Lightning" ) {
			// Extract the priduct price in BTC
			var btcprice = req.body.price;
			// Convert from BTC to Satoshis 
			var insatoshis = Math.round(btcprice * 100000000);			

			// Connect to LND node and generate an invoice passing the amount in satoshis. 
			var invoice = await lndConnect.callLnd("addInvoice", insatoshis);

			var address = { address: invoice };

		} else {
			var address = { address: "1234567890abcdefghijklmnopqrstuvwxyz" };
		}

		return res.status(200).send(address)
	},

	newTransaction : function newTransaction (req, res) {
		// This function demonstrates how to add a new transaction record to the mongoDB
		
		// First, populate an object with the appropriate parameters. 
		// See models/transaction.js for the appropriate syntax
		// The 'status' field can be set to either 'pending' or 'filled'

		var newTx = {
			  amount    : req.body.amount, 
			  product   : req.body.product,
			  status    : 'pending',
			  nonce     : ( Math.random() * 1000 ),
			  timeStamp : new Date(),
			  address   : this.getAddress(req.body.currency.code),
			  currency  : req.body.currency.name,
		};

		// Next, use the tx object (initialized at the top of this file) to create a new mongoDB record

		tx.create(newTx, function(err, txRecord) {
			if ( err ) {
				console.log( 'error creating new transaction ', err );
				res.status(200).send({err: err});
			} else {
				console.log( '\r\n\r\nnew tx created \r\n ', txRecord );
				res.status(200).send( txRecord );
			}
		})

		// Next, be sure to trigger a listener to watch for this transaction to be confirmed. 
		// Ethereum listeners should poll Infura for new transactions, and Bitcoin listeners will poll the local node via ZMQ

	},
	
	txIsPaid : function txIsPaid (req, res) {

		// this is a template function to check if a tx has been paid 
		// pass a json formatted payload like { address: < crypto address >, amount: < numeric amount > }

		console.log("When is the txIsPaid funciton run?");

		var address = req.body.address;

		console.log('searching for transactions with address')

		tx.findOne({ address: address }, function (err, record) {
			if (err) {
				console.log('err', err);
			} else {
				console.log('record found', record);
				if ( record.status === 'paid' ) {
					console.log('Found a transaction with that address which has been paid!')
					if ( record.amount === req.body.amount ) {
						// if the amount matches, update the record to indicate it's been paid, and reply to the client
						tx.updateOne({_id: record._id}, function (err, record) {
							if ( err ) {
								console.log('error updating record');
							} else {
								console.log('successfully updated record as paid');
								res.status(200).send( { success : true } );
							}
						})
					} else {
						console.log('the amount did not match, are there possibly multiple records with this address?')
					}
						
					
				}
					
			}
		})

	}
}