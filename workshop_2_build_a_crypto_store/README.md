# Workshop 2: Build a Crypto-Compatible Web Store

### What is this?

This repo contains instructions and sample code to help users learn to handle cryptocurrency transactions for a basic web store written in vanilla JS with a node.js server as the back end. The server is stored in app/ and the client is stored in public/.

While Node.js isn't a perfect solution for production deployments, it's a useful prototyping environment and supports the majority of the libraries and tools which are needed in crypto and blockchain development. Pay close attention to the libraries being used, as you may need to seek alternatives to them if you find yourself building in a different environment in the future. 

***NOTE:*** *The sample webstore can be found in the store/ directory at the root of this repo. Update it as you go to build your own custom store throughout the remainder of this workshop.*

### Contents

1. [Setup](#setup)
2. [Launch](#launch)
3. [Lab Instructions](#lab-instructions)
4. [Next Steps](#next-steps)


# Lab Instructions

In this lab, we'll explore how to build a web-store with integrated cryptocurrency payments. Example scripts can be found in this directory, and should have the dependancies installed with `cd examples && npm i` before use in testing.

## 1. Connect Your Bitcoin Node to the Store

### A. Listen to your Bitcoin Node 
Use the example in examples/zmq-listen.js to connect to your Bitcoin node and listen to transactions. Be sure to get your address using the bitcoin-cli shell command, and add it to the example script to listen for transactions from your wallet.

You can use the following command to run the example script:
```node zmq-listen.js```

Open this file in a text editor to see how it is interacting with your Bitcoin node. The main thing to look for is the module integrations. You should see several lines like this:
`require('bitcoinjs-lib');`
`require('bitcoind-rpc');`
`require('zeromq');`

These are the main NPM libraries being imported. You can always find the full module details and documentation on the official NPM Website: https://www.npmjs.com/

*HINT: You'll need to configure your RPC Credentials to match bitcoin.conf, and you will want to add the following lines to bitcoin.conf. Be sure to restart bitcoind once this is complete.*

```
zmqpubrawtx=tcp://127.0.0.1:3001
zmqpubrawblock=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
zmqpubhashblock=tcp://127.0.0.1:3000
```

Once this is set up, you can test that the listener is working properly by generating some new blocks to your address:

`bitcoin-cli generatetoaddress 2 < your address >`

Depending on your configuration, may be necessary to add the --regtest flag like so: 
`bitcoin-cli --regtest generatetoaddress 10 2N74Lq6GYDo69xnA2sgGFrUiyHzFcDrp6NE`

### B. Add Your Address to the Web Store

Open the payment controller at `app/controllers/payment.js` and add your Bitcoin address to the `getAddress` function. 

You can get an address from your Bitcoin node by running `bitcoin-cli getnewaddress`.


### C. Add a ZMQ Listener function to the payments controller

Add a new function to the payments controller using the zmq-listen.js script as an example. The function should return 'true' if a payment has been made using the correct currency for the price specified. 

You may want to build out this functionality inside of the helper function tools in `util/confirmationHelper.js`. This is imported into the bottom of app.js ( lines 71-73 ) and will be automaticaly triggered on the app startup. 


## 2. Ethereum Payment Confirmation

It may come as a suprise, but Bitcoin isn't the only cryptocurrency! 

### A. Create an Ethereum Wallet

Visit https://myetherwallet.com and create a new Ethereum wallet. Download the seed, and add the address to the getAddress call in `app/controllers/payment.js`.


### B. Use the Ethereum Testnet Faucet to get some ETH

Visit https://faucet.ropsten.be/ to get some test ETH sent to your new wallet.

**NOTE:** Ethereum has several testnets. These tokens are for the Ropsten testnet. This will be important in the next step.


### C. Implement Payment Confirmations via Infura

Infura provides a public registry of the Ethereum Blockchain. Use the example in `examples/infura-listener.js` to implement an Infura listener to verify a transaction which has been made to your address. 


## 3. Hierarchical Deterministic Wallets

An HD Wallet allows the user to derive many public and private key pairs from a single cryptographic seed. 

### A. Generate a Seed

Review the code in `examples/derive-master-seed.js` and try running it to generate a cryptographic seed.


### B. Derive Public Keys

The file at `examples/derive-public-keys` uses HD wallet libraries and your extended public key from A to derive a public key for a particular derivation path.


### C. Derive Private Keys

In order to unlock funds sent to an HD Wallet, it's necessary to derive their private keys using the same path from B and the seed from A. 

Try deriving the private keys for your wallet from B, and test that they work using an online wallet like https://myetherwallet.com or https://bitaddress.org/ (See the 'Wallet Details' Tab).


### D. Add Address Derivation to Your Store

Using your knowledge from this module, expand the functionality of `app/controllers/payment.js` to return a new public address for each transaction. 


### E. Extra Credit: Write a Sweep Function

Now that you're generating a new address for each transaction, your store is extremely private and secure, but how can you access these funds?

Expand the functionality of your store further by creating a new file called `app/sweepFunction.js` which allows you to generate the private keys for a particular derivation path and seed phrase, and add a call to your Bitcoin Node via the RPC method from 1.C to send a transaction with the full value of that address to a new BTC address which we'll use for cold storage. 

You can get a new BTC address for 'Cold Storage' from http://bitaddress.org


