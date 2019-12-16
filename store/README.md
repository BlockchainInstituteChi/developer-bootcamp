# Sample Web Store

This simple store is provided for testing purposes, to assist students in configuring blockchain technology in a realistic environment. Please be sure to follow the workshops in order so that you can build a fully operational web store.

# Setup

## Install NPM & Node.js

### Ubuntu / Debian / Linux

```sudo apt-get install nodejs npm```

### Mac 

```brew install npm```

### Windows

Install node from http://nodejs.org/download/ and open the node command prompt.

## Install the Node Version Manager

This isn't a mandatory step, but it may be useful in the future as some node packages do not support all versions.

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

Now, you can install and use different node versions with the following commands. For example, we'll install and use version 10 for these modules. 

Install the Node version: `nvm i 10`

Set your terminal to use this version: `nvm use 10`

After switching versions, you'll always want to delete any remaining `package-lock.json` and `node_modules/` files as these will force old versions of modules to be installed. 

## Install MongoDB

We'll use a MongoDB NoSQL database to store some basic information such as transaction history and unconfirmed crypto transactions. 

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

## Install System-Level Packages

Some dependancies will need to be installed before we can use the npm libraries fully. Ask an instructor if you are unable to get these steps to work. 

### Ubuntu 

`apt-get install libtool pkg-config build-essential autoconf automake libzmq3-dev`


## Web Store Setup

### Client Local Hosting

In order to serve the client files, we'll be using the NPM Local Web Server module. To install it, run the command below from the root directory of workshop 2. 

`npm i local-web-server -g ` 


### Server

To set up the server, you'll need to enter the app/ directory and install the npm modules with `npm install`

This will generate a node_modules folder containing the npm dependancy files and may take some time. Do not run this command as your root user. 

***NOTE:*** *If you already have a working version of npm and node.js, just make sure they're above version 6. If not, you can use the Node Version Manager to install the correct version.*


# Launch

In order to run this project, you'll need to run a webserver in the public/ directory, and run the node.js app in the app/ directory.

## Client

Start the localhost environment from the public/ folder of this project using a local http server. You can run `npm start` from the `public/` folder of this workshop to run the npm webserver. 

You can then visit the store at `localhost:8000`

***Note:*** *if you need to kill the webserver, this command will work on Unix based systems `kill -9 $(lsof -t -itcp:8000)`*


## Server

Start the node.js application server in a new window by running `cd app/ && node app.js`

Once the app is running, you can check the heartbeat function by visiting the url below. This will render a page showing you that the server is running properly. 

http://localhost:8887/

***NOTE:*** *You can alternatively run this using nodemon which will restart the server every time you make a change to any file in the app/ directory. To install nodemon, use `npm install -g nodemon` and run the app with `nodemon app.js`. The `-g` flag will allow you to use the nodemon npm plugin from the command line.*


# Summary of Workshops

## Workshop 1: Running a Bitcoin Node

Our first workshop will get you acquainted with the fundamentals of blockchain mechanics by working hands-on with a Bitcoin node. We cover how to set up a node, run in regtest mode, send and receive transactions, and use RPC ports to access the node directly. 

## Workshop 2: Wallet Technology

Once your node is online, we'll help you connect it to your store, and derive additional addresses using hierarchical deterministic wallets. We'll help you set up transaction listeners from the app layer, and get you started with a regtest integration.

## Workshop 3: Second Layer Payments

Once your store is configured to set up Bitcoin payments, we'll integrate instant transaction processing with Lightning payment channels. 

## Workshop 4: Permissioned Blockchains

Now, we'll connect your store to a hyperledger supply chain, and set up real time inventory and on-chain settlement.

## Workshop 5: Web3 & Decentralization

Finally, we'll help you set up a uPort identity layer to allow you to verify drivers licenses from your customers before selling them a car. 


