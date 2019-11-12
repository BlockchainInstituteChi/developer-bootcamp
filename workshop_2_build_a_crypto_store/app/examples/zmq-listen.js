// What's your address (Hint: Get it from the bitcoin-cli getnewaddress )

var myAddress = "2NEUL36NvtzVdNRqxw3L1sq7PHY5D1Nomr5";

// Library for working with the bitcoin protocol.
// For working with transactions, hd wallets, etc.
var bitcoin = require('bitcoinjs-lib'),
	RpcClient = require('bitcoind-rpc');

var config = {
    protocol: 'http',
    user: 'test',
    pass: 'test',
    host: '127.0.0.1',
    port: '18443',
};

var rpc = new RpcClient(config);

// Implementation of ZeroMQ in node.js.
// From the maintainers of the ZeroMQ protocol.
var zmq = require('zeromq');

// Create a subscriber socket.
var sock = zmq.socket('sub');
var addr = 'tcp://127.0.0.1:3001';

// Initiate connection to TCP socket.
sock.connect(addr);

// Subscribe to receive messages for a specific topic.
// This can be "rawblock", "hashblock", "rawtx", or "hashtx".
sock.subscribe('rawtx');

sock.on('message', function(topic, message) {
  console.log('\r\nreceived raw tx:', message.toString('hex'), "\r\n");

  rpc.decodeRawTransaction(message.toString('hex'), function(err, resp) {
  		// console.log("\r\nerr", err, "\r\nresp", resp);

        console.log(JSON.stringify(resp, null, 4))

        var inputs = resp.result.vin;

        var outputs = resp.result.vout;

        console.log('vin', inputs, '\r\n\r\nvout', outputs);

        for ( var vin in inputs ) {
        	vin = inputs[vin];

        	if ( typeof(vin.scriptPubKey) != 'undefined' ) {

		        if ( typeof(vin.scriptPubKey.addresses) != 'undefined' ) {
		        	console.log('vin addresses ', vin.scriptPubKey.addresses)

		        	for ( var address in vin.scriptPubKey.addresses ) {
		        		if ( vin.scriptPubKey.addresses[address] === myAddress ) {
		        			printDebitMessage( vin.scriptPubKey.addresses[address], vin.value );
		        		} else {
		        			console.log('+ - - - - Not your wallet, ignoring. - - - - - +')
		        		}

		        	}
		        }
		    
		    }
        }
        
        for ( var vout in outputs ) {
        	vout = outputs[vout];

		    if ( typeof(vout.scriptPubKey) != 'undefined'  ) {
	            
	        	if ( typeof(vout.scriptPubKey.addresses) != 'undefined'  ) {
	        		console.log('vout addresses ', vout.scriptPubKey.addresses)

		        	for ( var address in vout.scriptPubKey.addresses ) {
		        		if ( vout.scriptPubKey.addresses[address] === myAddress ) {
		        			printCreditMessage(  vout.scriptPubKey.addresses[address], vout.value );
		        		} else {
		        			console.log('+ - - - - Not your wallet, ignoring. - - - - - +')
		        		}

		        	}
	        	}

	        }
	    }

  })
});

function printDebitMessage ( address, amount ) {

	console.log('+ - - - - - New Debit - - - - - +')
	console.log(' ')
	console.log( amount + ' BTC was deducted from ' + address + ' at ' + new Date() )
	console.log(' ')
	console.log(' ')
	
} 

function printCreditMessage ( address, amount ) {

	console.log('+ - - - - - New Debit - - - - - +')
	console.log(' ')
	console.log( amount + ' BTC was deposited to ' + address + ' at ' + new Date() )
	console.log(' ')
	console.log(' ')
	
} 