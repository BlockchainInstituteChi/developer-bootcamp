//lnd-connect.js

const createLnRpc = require('lnrpc');
const dotenv = require('dotenv').config();

async function callLnd(lndcommand, options) {

  const lnrpc = await createLnRpc({
  	server: process.env.LND_GRPC_URL,
  	cert: new Buffer.alloc(5000, process.env.LND_TLS_CERT, 'base64').toString('ascii'),
  	macaroon: new Buffer.alloc(5000, process.env.LND_MACAROON, 'base64').toString('hex'),
  });

  // All requests are promisified
  // We need to change this so that the command is passed in. 
  var result = await lnrpc[lndcommand]({options});

  switch(lndcommand){
    case "addInvoice":
      // extracts the invoice string from the object. 
      result = result['payment_request'];
      break;
    default:
      result = result;
      break;
  }

  return result;

};

module.exports.callLnd = callLnd;