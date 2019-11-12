< insert readme here >


## Install Dependancies

### Go

#### Mac

`brew install go@1.13`

#### Ubuntu 

### Bitcoind 

See Workshop 1 Instructions (insert link)


## Lightning Setup

## 1. Verify that Bitcoind is working as expected.

Open a new terminal window and type `bitcoind` to start the daemon.

Then, verify that you're connected to the lab peer with `bitcoin-cli listpeers` 

If you do not see the lab node, repeat the setup instructions from Workshop 1. 


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

Open your lnd.conf file (located at ~/.lnd/lnd.conf) and replace the contents with the following:
`bitcoin.active=1
bitcoin.regtest=1
bitcoin.node=bitcoind
debuglevel=debug
bitcoind.rpcuser=test
bitcoind.rpcpass=test
bitcoind.zmqpubrawtx=tcp://127.0.0.1:3001
bitcoind.zmqpubrawblock=tcp://127.0.0.1:3000
adminmacaroonpath=~/.lnd/data/chain/bitcoin/regtest/admin.macaroon
readonlymacaroonpath=~/.lnd/data/chain/bitcoin/regtest/readonly.macaroon
invoicemacaroonpath=~/.lnd/data/chain/bitcoin/regtest/invoice.macaroon`

## 4. Test LND 

Open a new terminal window and type `lnd`. 

## 5. Create an LND Wallet

In a separate terminal enter the command below to create a Lightning wallet and keys. 

`lncli create`


## 6. Check for Peers

Now that you're online, you should be able to see peer nodes on the same Bitcoin network via Regtest. Use the following command to list peer nodes:

`INSERT COMMAND TO USE HERE` 



## Lab Instructions

