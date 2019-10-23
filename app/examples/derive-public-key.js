// derive-public-keys.js

const HDKey = require('hdkey');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
const rp = require('request-promise')
const _hdkey = require('ethereumjs-wallet/hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util')
const Web3 = require('web3')
const base58 = require('base-58')
const bitcoin = require('bitcoinjs-lib')
const bs58check = require('bs58check')
const master_pubx = "xpub661MyMwAqRbcEqK6yBmPA38CjWeRppeiAnwRAVY4bBCoP8qiuH1289638JuvVZ8L83ZWwpXoNdubDbMeZH459f5MuR6MZaRGYn8U3ykbZzn"

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// generate this using examples/derive-master-seed.js
var extendedPublicKey = "xpub661MyMwAqRbcFCqPYapf73dXBXGDNsRAspRis3zuTfrTh9byhZsFJR4SUEbiaE4KfEQ81ZmMgwgjzR7dHfSQ2cBGYRSV11SEHqGJS6KksYs";
var public_seed 	  = HDKey.fromExtendedKey(extendedPublicKey);

// Pick either ETH or BTC to derive an address
var currency = "BTC";

var bip_level = "49";

// Let's loop through to demonstrate the use of nonces:
for ( var i = 0; i < 5; i++ ) { 

	console.log('generating address ', generateAddressFromNonce( public_seed, i, currency ));

}








// Returns a new address for a given public extended key, nonce, and currency
function generateAddressFromNonce (public_seed, nonce, currency) {

		var currency_path_code = getCurrencyCode(currency)

		// here, we make a path for the derivation based on the nonce used 
		var PATH = 'm/' + bip_level + '/' + currency_path_code + '/0/0/' + nonce
		var node = public_seed.derive(PATH)

		if ( "ETH" === currency ) {

			var pubKey = ethUtil.importPublic(node._publicKey)

			var address = ethUtil.pubToAddress(pubKey).toString('hex')

			var chaddress = ethUtil.toChecksumAddress(address)
			
		} else if ( "BTC" === currency ) {

			var keyPair = bitcoin.ECPair.fromPublicKey(node._publicKey)

		    var chaddress = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address

		}
		console.log("New Wallet Generated", "\nAt path: " + PATH, "\nFull Node: ", node, "\nPub: " + pubKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )
		
		return chaddress
}

// Returns the derivation path number for a given currency (eth or btc)
function getCurrencyCode(currency) {
	// Add switch for currency codes here
	if ('ETH' === currency ) {
		return "60";		
	} else if ( 'BTC' === currency ) {
		return "1"
	} else {
		return "60"
	}

}

// Returns an integer number from a string containing one 
function getIntegerFromString (string) {

		var integer = ""

		for ( i = 0; i < string.length; i++ ) {
			integer += string[i].charCodeAt(0)
		}

		return integer;

}	