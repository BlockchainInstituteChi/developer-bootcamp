# Blockchain Institute Developer Crash Course

### What is this?

This repo contains instructions and sample code to help users learn to handle cryptocurrency transactions for a basic webstore written in vanilla JS with a node.js server as the back end. The server is stored in app/ and the client is stored in public/.

# Setup

## Install NPM & Node.js

### Ubuntu / Debian / Linux

```sudo apt-get install nodejs npm```

### Mac 

```brew install npm```

### Windows

Install node from http://nodejs.org/download/ and open the node command prompt.

## Install MongoDB

### Ubuntu

Configure the proper apt-key

```sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4```

#### Ubuntu 18.04
```echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list```

#### Ubuntu 16.04
```echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list```

Install the repo
```
sudo apt update
sudo apt install mongodb-org
```

```sudo apt install mongodb-org=4.0.1 mongodb-org-server=4.0.1 mongodb-org-shell=4.0.1 mongodb-org-mongos=4.0.1 mongodb-org-tools=4.0.1```

Start the service:
```
sudo systemctl enable mongod
sudo systemctl start mongod 
```

You can now stop the service with
```
sudo systemctl stop mongod
sudo systemctl restart mongod 
```

## Install Python 2

### Ubuntu 

This is not required.

### Windows

< This section not yet complete >

### Mac OS

< This section not yet complete >


## Install NPM Dependancies

To set up the server, you'll need to enter the app/ directory and install the npm modules with `npm install`

** This will generate a node_modules folder containing the npm dependancy files and may take some time. Do not run this command as your root user. 


# Launch

In order to run this project, you'll need to run a webserver in the public/ directory, and run the node.js app in the app/ directory.

### Client

Start the localhost environment from the public/ folder of this project using a local http server. On Ubuntu: ```sudo python2 -m SimpleHTTPServer 8001```

You can then visit the store at `localhost:8001`

### Server

Start the node.js application server by running `cd app/ && node app.js`

Once the app is running, you can check the heartbeat function by visiting `http://localhost:8887/helloWorld`

NOTE: You can alternatively run this using nodemon which will restart the server every time you make a change to any file in the app/ directory. To install nodemon, use `npm install -g nodemon` and run the app with `nodemon app.js`. The `-g` flag will allow you to use the nodemon npm plugin from the command line. 


# Lab Instructions

## 1. Connect Your Bitcoin Node to the Store

### A. Listen to your Bitcoin Node 
Use the example in app/examples/zmq-listen.js to connect to your Bitcoin node and listen to transactions. Be sure to get your address using the bitcoin-cli shell command, and add it to the example script to listen for transactions from your wallet.

You can use the following command to run the example script:
```node examples/zmq-listen.js```

HINT: You'll need to configure your RPC Credentials to match bitcoin.conf, and you will want to add the following lines to bitcoin.conf. 

```
zmqpubrawtx=tcp://127.0.0.1:3000
zmqpubrawblock=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
zmqpubhashblock=tcp://127.0.0.1:3000
```

### B. Add Your Address to the Web Store

Open the payment controller at `app/controllers/payment.js` and add your Bitcoin address to the `getAddress` function. Please refer to workshop 1 for more information about how to get your Bitcoin address using bitcoin-cli. 


### C. Add a ZMQ Listener function to the payments controller

Add a new function to the payments controller using the zmq-listen.js script as an example. The function should return 'true' if a payment has been made using the correct currency for the price specified. 

You may want to build out this functionality inside of the helper function tools in `util/confirmationHelper.js`. If you trigger your ZMQ listener on startup in app.js, you can have it automatically check all new transactions against the existing database. If the address and amount matches, change the transaction's status to 'paid'. 

HINT: To import another file as a module, you can use a require call as shown below:
```var util     = require('./util/confirmationHelper.js');```


## 2. Ethereum Payment Confirmation

### A. Create an Ethereum Wallet

Visit https://myetherwallet.com and create a new Ethereum wallet. Download the seed, and add the address to the getAddress call in `app/controllers/payment.js`.


### B. Use the Ethereum Testnet Faucet to get some ETH

Visit https://faucet.ropsten.be/ to get some test ETH sent to your new wallet.

NOTE: Ethereum has several testnets. These tokens are for the Ropsten testnet. This will be important in the next step.


### C. Implement Payment Confirmations via Infura

Infura provides a public registry of the Ethereum Blockchain. Use the example in `app/examples/infura-listener.js` to implement an Infura listener to verify a transaction which has been made to your address. 


## 3. Hierarchical Deterministic Wallets

An HD Wallet allows the user to derive many public and private key pairs from a single cryptographic seed. 

### A. Generate a Seed

Review the code in `app/examples/derive-master-seed.js` and try running it to generate a cryptographic seed.


### B. Derive Public Keys

The file at `app/examples/derive-public-keys` uses HD wallet libraries and your extended public key from A to derive a public key for a particular derivation path.


### C. Derive Private Keys

In order to unlock funds sent to an HD Wallet, it's necessary to derive their private keys using the same path from B and the seed from A. 

Try deriving the private keys for your wallet from B, and test that they work using an online wallet like https://myetherwallet.com or https://bitaddress.org/ (See the 'Wallet Details' Tab).


### D. Add Address Derivation to Your Store

Using your knowledge from this module, expand the functionality of `app/controllers/payment.js` to return a new public address for each transaction. 


### E. Extra Credit: Write a Sweep Function

Now that you're generating a new address for each transaction, your store is extremely private and secure, but how can you access these funds?

Expand the functionality of your store further by creating a new file called `app/sweepFunction.js` which allows you to generate the private keys for a particular derivation path and seed phrase, and add a call to your Bitcoin Node via the RPC method from 1.C to send a transaction with the full value of that address to a new BTC address which we'll use for cold storage. 

You can get a new BTC address for 'Cold Storage' from http://bitaddress.org


