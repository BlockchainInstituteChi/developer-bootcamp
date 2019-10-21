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
var addr = 'tcp://127.0.0.1:3000';

// Initiate connection to TCP socket.
sock.connect(addr);

// Subscribe to receive messages for a specific topic.
// This can be "rawblock", "hashblock", "rawtx", or "hashtx".
sock.subscribe('rawtx');

sock.on('message', function(topic, message) {
  console.log('\r\nreceived raw tx:', message.toString('hex'), "\r\n");

  rpc.decodeRawTransaction(message.toString('hex'), function(err, resp) {
  		console.log("\r\nerr", err, "\r\nresp", resp);

        console.log(JSON.stringify(resp, null, 4))
  })
});