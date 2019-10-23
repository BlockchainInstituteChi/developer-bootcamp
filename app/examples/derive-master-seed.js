// derive

const HDKey = require('hdkey');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var seed_phrase = new _bitcoreMnemonic2.default(_bitcoreMnemonic2.default.Words.ENGLISH).toString();

var master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString();

var seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key))

var master = {
	'seed_phrase':seed_phrase,
	'master_priv_key':master_priv_key,
	'extended_pub_key':seed.publicExtendedKey
};

console.log(master)