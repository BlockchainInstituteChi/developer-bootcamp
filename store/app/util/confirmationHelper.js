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
	    port: '4000',
	};

var rpc  = new RpcClient(config);
var zmq  = require('zeromq');
var sock = zmq.socket('sub');
var addr = 'tcp://127.0.0.1:3001';


// This module handles repetitive tasks associated with polling for confirmation results

module.exports = {
	watchBTCNodeForPendingTrans : function watchBTCNodeForTrans () {
		// This function configures the zmq listener
		console.log('initialized watchBTCNodeForTrans');
		
		sock.connect(addr);
		sock.subscribe('rawtx');
		sock.on('message', function(topic, message) {
			console.log('\r\nreceived raw tx:', message.toString('hex'), "\r\n");

			rpc.decodeRawTransaction(message.toString('hex'), function(err, resp) {
				// Insert your transaction parsing logic here 
				// i.e. for (pendingTx) ... if ( resp.address === pendingTx[i].address) then updateTxPaid('1234567890abcdefghijklmnopqrstuvwxyz');
				if (err) return console.log('error decoding rpc raw tx', err);

				console.log('rpc raw tx returned decoded', resp)

				var outputs = resp.result.vout;

				getPendingTx( function(err, result) {
					console.log('found pending transactions ', result)


			        for ( var vout in outputs ) {
			        	vout = outputs[vout];

					    if ( typeof(vout.scriptPubKey) != 'undefined'  ) {
				            
				        	if ( typeof(vout.scriptPubKey.addresses) != 'undefined'  ) {
				        		console.log('vout addresses ', vout.scriptPubKey.addresses)

					        	for ( var address in vout.scriptPubKey.addresses ) {

					        		for ( var pendingTransaction in result ){
						        		
						        		console.log('checking pending transaction', pendingTransaction)
					        			// Insert your comparison logic here to identify paid transactions
					        			// Then run updateTxPaid( pendingTransaction._id )

						        	}

					        	}
				        	}

				        }
				    }
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

function updateTxPaid (txId) {

	tx.updateMany({ _id : txId }, { status : "paid" }, function(err, res) {
		
		if (err) throw err;
		
		console.log('record updated to paid ', res);

	});
}

function getPendingTx ( cb ) {

	// We will ignore all tx older than fifteen minutes
	var date = (new Date()).getTime() - 900000;

	console.log('date', date);

	var filter = { 
		status: "pending", 
		timeStamp: { $gt: date } 
	};

	tx.find(filter, function (err, record) {
		console.log('tx.find returned ', err, record)
		cb (err, record);
	})

}