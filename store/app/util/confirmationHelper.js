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
		
		console.log('initialized watchBTCNodeForTrans');
		getPendingTx( function(err, result) {
			var pendingTx = result;

			sock.connect(addr);
			sock.subscribe('rawtx');

			sock.on('message', function(topic, message) {
				console.log('\r\nreceived raw tx:', message.toString('hex'), "\r\n");

				rpc.decodeRawTransaction(message.toString('hex'), function(err, resp) {
					// Insert your transaction parsing logic here 
					// i.e. for (pendingTx) ... if ( resp.address === pendingTx[i].address) then updateTxPaid('1234567890abcdefghijklmnopqrstuvwxyz');
					
				});
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

function updateTxPaid (paidAddress, paidAmount) {

	if (paidAmount === "undefined") {
		var filter = { address : paidAddress };
	} else {
		var filter = { address : paidAddress, amount : paidAmount };
	}

	tx.updateMany(filter, { status : "paid" }, function(err, res) {
		
		if (err) throw err;
		
		console.log('address ' + paidAddress + ' updated to paid ');

	});
}

function getPendingTx ( cb ) {

	tx.find({ status: "pending" }, function (err, record) {
		console.log('tx.find returned ', err, record)
		cb (err, record);
	})

}