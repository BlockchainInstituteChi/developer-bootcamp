# Blockchain Institute Developer Crash Course

# Setup

## Install NPM & Node.js

### Ubuntu / Debian / Linux

```sudo apt-get install nodejs npm```

### Mac 

```brew install npm```

### Windows

Install node from http://nodejs.org/download/ and open the node command prompt.

## Install Yarn

Assuming nodejs/npm is correctly installed, the next step is to install gulp with and then all the project dependencies, along with yarn.

```sudo npm -g install yarn```


## Launch


### Client

Start the react localhost environment from the public/ folder of this project using a local http server. On ubuntu: ```sudo python2 -m SimpleHTTPServer 8001```

You can then visit the store at `localhost:8001`

### Server

Start the node.js application server by running `cd app/ && node app.js`

Once the app is running, you can check the heartbeat function by visiting `http://localhost:8887/helloWorld`

NOTE: You can alternatively run this using nodemon which will restart the server every time you make a change to any file in the app/ directory. To install nodemon, use `npm install -g nodemon` and run the app with `nodemon app.js`.


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


## 2. 

