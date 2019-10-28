// confirmationHelper.js

var bitcoin   = require('bitcoinjs-lib'),
	RpcClient = require('bitcoind-rpc'),
	mongoose  = require('mongoose'),
	tx        = mongoose.model('transaction');

var config = {
	    protocol: 'http',
	    user: 'test',
	    pass: 'test',
	    host: '127.0.0.1',
	    port: '18443',
	};

var rpc  = new RpcClient(config);
var zmq  = require('zeromq');
var sock = zmq.socket('sub');
var addr = 'tcp://127.0.0.1:3000';


// This module handles repetitive tasks associated with polling for confirmation results

module.exports = {
	watchBTCNodeForPendingTrans : function watchBTCNodeForTrans () {
		
		sock.connect(addr);
		sock.subscribe('rawtx');

		sock.on('message', function(topic, message) {
			console.log('\r\nreceived raw tx:', message.toString('hex'), "\r\n");

			rpc.decodeRawTransaction(message.toString('hex'), function(err, resp) {
				// Insert your transaction parsing logic here 

			});
		});
	}, 
	checkIfAddressIsPendingTx : function checkIfAddressIsPendingTx (address) {

		// This helper function checks if a pending transaction exists for a given address
		tx.find({ address : address }, function (err, record) {
			if (err ) {
				console.log('err', err)
				
			} else {
				console.log( 'record found for address', record );

			}
		});

	}
}

