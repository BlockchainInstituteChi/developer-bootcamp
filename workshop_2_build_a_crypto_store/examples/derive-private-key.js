
// Dependancies
var rp = require('request-promise');
var _hdkey = require('ethereumjs-wallet/hdkey');
var HDKey = require('hdkey')
var wallet = require('ethereumjs-wallet')
var ethUtil = require('ethereumjs-util');
var Web3 = require('web3')
var base58 = require('base-58');
var bs58check = require('bs58check')
// var ethHdWalletUtil = require('eth-hd-wallet')
var bitcoin = require('bitcoinjs-lib')
var _bitcoreMnemonic = require('bitcore-mnemonic');
var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


// Settings
var currencySelection = "ETH";

var bip_level = "49";

// Get a private seed phrase from 'derive-master-seed.js'
var seed_phrase = "movie normal order eye brick supreme avocado word rude much name snow";

var master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString();

var seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key))
console.log('seed', seed)

for ( var i = 0; i < 5; i++ ) {

	console.log(derivePKeyForNonce( i, currencySelection, seed ));

}

function derivePKeyForNonce (nonce, currency, private_seed) {

	var currency_path_code = getCurrencyCode(currency)

	var PATH = 'm/' + bip_level + '/' + currency_path_code + '/0/0/' + nonce

	console.log('Path is ', PATH)

	var node = private_seed.derive(PATH)

	var pubKeyx = node._publicKey

	var privateKey = node._privateKey.toString('hex')

	if ( "ETH" === currency ) {
	
		var pubKey = ethUtil.privateToPublic(node._privateKey)
		var address = ethUtil.publicToAddress(pubKey).toString('hex')
		var chaddress = ethUtil.toChecksumAddress(address)
		
	} else if ( "BTC" === currency ) {

		var	keyPair = bitcoin.ECPair.fromPrivateKey(new Buffer(privateKey, 'hex'))
	    var chaddress = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
	    
	}
	// console.log("\nNew Wallet Key Generated", "\nFor path: " + PATH, "\nFull Node: ", node, "\nPub: " + pubKeyx.toString('hex'), "\nPriv: " + privateKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )
	
	var derived_node = {
		"pub":chaddress.address,
		"priv":privateKey
	}

	// console.log(node)
	return derived_node

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