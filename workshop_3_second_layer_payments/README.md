# Workshop 3: Second Layer Payments

Second Layer solutions use a blockchain as a point of origin and provide possible solutions for scalability by reducing the number of on-chain transactions that need to occur. 

The Bitcoin Lightning network is one such solution which provides users with the ability to send nearly instantaneous bitcoin transactions for a fraction of the fees compared to a traditional transaction. 

## Install Dependancies

### Go

#### Mac

`brew install go@1.13`

#### Ubuntu 

`sudo apt-get install go`


### Bitcoind 

See Workshop 1 Instructions (insert link)


## Lightning Setup

## 1. Verify that Bitcoind is working as expected.

Open a new terminal window and type `bitcoind` to start the daemon.

Then, verify that you're connected to the lab peer with `bitcoin-cli listpeers` 

If you do not see the lab node, repeat the setup instructions from Workshop 1. Be sure that your bitcoinf.conf matches the following example:

```
# Use the regtest network, because we can generate blocks as needed.
regtest=1

# In this example, we will keep bitcoind running in one terminal window.
# So we don't need it to run as a daemon.
daemon=0

# RPC is required for bitcoin-cli.
server=1
rpcuser=test
rpcpassword=test

# In this example we are only interested in receiving raw transactions.
# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubrawtx=tcp://127.0.0.1:3001
zmqpubrawblock=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
zmqpubhashblock=tcp://127.0.0.1:3000

[regtest]
# port=18999
connect=192.168.86.188
```


## 2. Install LND

Lightning requires an additional set of client software to be installed to support opening and using channels. We will need to compile the project using Go, and then add the binaries to the appropriate directory and the Shell path so you can access them within your CLI. 

### Unix (Mac & Ubuntu)

`go get -d github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
make && make install`

***Note: Your $GOPATH may differ***

### Windows (untested)
For Windows WSL users, repeat the same steps above, but 'make' will need to be referenced directly via /usr/bin/make/, or alternatively by wrapping quotation marks around make, like so:

`/usr/bin/make && /usr/bin/make install
"make" && "make" install`

## 3. Configure LND

Open your lnd.conf file and replace the contents with the following:
```
bitcoin.active=1
bitcoin.regtest=1
bitcoin.node=bitcoind
debuglevel=debug

bitcoind.rpcuser=test
bitcoind.rpcpass=test
bitcoind.zmqpubrawtx=tcp://127.0.0.1:3001
bitcoind.zmqpubrawblock=tcp://127.0.0.1:3000

adminmacaroonpath=~/.lnd/data/chain/bitcoin/regtest/admin.macaroon
readonlymacaroonpath=~/.lnd/data/chain/bitcoin/regtest/readonly.macaroon
invoicemacaroonpath=~/.lnd/data/chain/bitcoin/regtest/invoice.macaroon
```

***lnd.conf Locations***
Mac: `/Users/< your username>/Library/Application\ Support/Lnd/lnd.conf`
Ubuntu / Linux: `~/.lnd/lnd.conf`
Windows: `< need to fill this in >`

## 4. Test LND 

Open a new terminal window and type `lnd`. 

## 5. Create an LND Wallet

In a separate terminal enter the command below to create a Lightning wallet and keys. 

`lncli create`


< Probably need to set up GRPC here > 

## 6. Check for Peers

Now that you're online, you should be able to see peer nodes on the same Bitcoin network via Regtest. Connect to a peer with the following command:

`lncli connect peerAddress@path::path` 

Use the following command to list peer nodes:

`lncli listpeers`



## Lab Instructions

