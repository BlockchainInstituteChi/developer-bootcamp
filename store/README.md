# Sample Web Store

This simple store is provided for testing purposes, to assist students in configuring blockchain technology in a realistic environment. Please be sure to follow the workshops in order so that you can build a fully operational web store.

## Running the Server

Our server will run from the `app/` directory of this project, and will provide a simple web server with a NoSQL database. 

To run the server, enter the directory and and run the following commands:
```
npm i
npm update
node app.js
```

## Running the Client

The client will run from the `public/` directory, and can be served using an npm webserver. Run the following command to install the webserver:

`npm i local-web-server -g`

Once installed, you can serve the client by entering the directory and running `npm start`.


## Summary of Workshops

### Workshop 1: Running a Bitcoin Node

Our first workshop will get you acquainted with the fundamentals of blockchain mechanics by working hands-on with a Bitcoin node. We cover how to set up a node, run in regtest mode, send and receive transactions, and use RPC ports to access the node directly. 

### Workshop 2: Wallet Technology

Once your node is online, we'll help you connect it to your store, and derive additional addresses using hierarchical deterministic wallets. We'll help you set up transaction listeners from the app layer, and get you started with a regtest integration.

### Workshop 3: Second Layer Payments

Once your store is configured to set up Bitcoin payments, we'll integrate instant transaction processing with Lightning payment channels. 

### Workshop 4: Permissioned Blockchains

Now, we'll connect your store to a hyperledger supply chain, and set up real time inventory and on-chain settlement.

### Workshop 5: Web3 & Decentralization

Finally, we'll help you set up a uPort identity layer to allow you to verify drivers licenses from your customers before selling them a car. 


