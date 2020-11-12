# Workshop #1 - Bitcoin Core

Welcome to the first workshop. By the time you’ve finished this session you’ll have some hands on experience working with Bitcoin transactions. Here we will setup a Bitcoin node, configure our node, practice bitcoin-cli commands and learn how to build a custom transaction, sign and broadcast it. 

But first, let’s set up Discord for sharing data with instructors and classmates. 

## Discord

Download the Discord program for Linux, Windows and macOS [here](https://discord.com)

Use this link to join the [Blockchain Institute Discord channel](https://discord.gg/VaKPnxDe)

## Bitcoind Setup

We are going to install the software that creates bitcoins and the Bitcoin network. What we will be installing is the latest version of the original client, also known as Bitcoin Core or BitcoinQT. BitcoinQT often referes to the UI, and here we will be primarily using the daemon which is known as bitcoind. 

Bitcoin.org has excellent instructions for installing bitcoin core on Linux, Windows and macOS [here](https://bitcoin.org/en/full-node)

The below instructions are for Debian Linux and while a bit less secure than the methods suggested via bitcoin.org, they are faster and simpler. 

`$ apt-add-repository ppa:bitcoin/bitcoin`

`$ apt-get update`

`$ apt-get install bitcoind`


Note:
>When setting up a mainnet node for production, it is best practice to create a new user to run bitcoind. 

Let's start the Bitcoin core daemon up with the below command:

`$ bitcoind -testnet -printtoconsole -daemon -server`

Let's break down what's happening here. 

`-testnet` this option tells bitcoind to connect to the testnet chain and not the mainnet chain. 

`-printtoconsole` this is a debugging option that sends debug info to the console. 

`-daemon` this keeps bitcoind running as a daemon in the background that can accept commands. 

`-server` this is an RPC option that allows bitcoind to accept command line and JSON-RPC commands. 

Let's check that things are working properly. First, check your home directory for a .bitcoin directory. Then open a new terminal window and print out the debug log with the below command.

`$ tail -f .bitcoin/testnet/debug.log`

If you've found the directory and don't see any errors or shutdown notices in the deglog then it looks like you've been successful in starting it up. 

However, we don't want to run bitcoind in testnet mode for long as it will be busy downloading the testnet blockchain which is not necessary for this course. So let's turn it off.

`$ pkill -9 -f bitcoind` 

We'll start it up again, this time in regtest mode, and tell it to connect to the classroom's node. 

`$ bitcoind -regtest -printtoconsole -daemon -server -connect=[classroom node IP]`


## Configure Bitcoind

Let's learn how to configure bitcoind. Navigate to the .bitcoin directory which should be located in the home directory of the current user. 

Create the bitcoin.conf file.

`$ touch bitcoin.conf`

First, let's add a user name and password for our RPC connections.

```
# Set up RPC

server=1

rpcuser=test

rpcpassword=test

rpchost=127.0.0.1

rpcport=6163


```

These settings will allow us to commuicate with bicoind via the bitcoin core command line interface, bitcoin-cli.

Next we'll want to tell our node to run our regtest network.

```
# Run on a regtest network

regtest=1


```


Let's also add our classroom node ip address so that we don't have to include in the start up command. 

```
# Connect to the classroom node

[regtest]

connect=[classroom node IP]
```
If you did not receive a classroom IP address, just use localhost here, or leave the connect parameter off altogether.


Let's kill bitcoind and restart to test if our config is functioning. 

`$ pkill -9 -f bitcoind` 

`$ bitcoind -printtoconsole -daemon` 


## Bitcoin-cli


If we'be set this up properly, we should be able to view connections to peers via bitcoin-cli commands. 

`$ bitcoin-cli getpeerinfo`

If empty brackets are returned it's time for some trouble shooting. What you want to see is JSON data that is displaying the connection information with the classroom node and the current blockchain state. Have a look through a get familiar with where to find data like the block height. 

As we are on regtest, the mining difficulty is set very low. One command and a few seconds is all it takes to mine blocks in this environment. Let's try it out!

First we'll need to tell bitcoind to create a new address for us to receive our mining reward.

`$ bitcoin-cli getnewaddress`

Before we mind some blocks let's check our current BTC balance. 

`$ bitcoin-cli getbalance`

Now let's use that address we generated in our command to mine some blocks. Let's start with just two blocks.

`$ bitcoin-cli generatetoaddress 2 [new bitcoin address]`

The command should return two block hashes. 

Check the balance of your bitcoin wallet again. Keep in mind that newly generated coins will have a delay on when they are considered confirmed and spendable. You may need to wait for your classmates to mine some blocks aswell before your new coins appear in your balance. 


## Sending Transactions

Generate a new address to add to the classroom chat via Riot.

`$ bitcoin-cli getnewaddress`

Find one of your classmates addresses and send them a transaction for a fraction of a bitcoin.

`$ bitcoin-cli sendtoaddress "your classmates address" 0.500`

Check on your transaction history to see if any of your classmates have sent you funds. 

`$ bitcoin-cli listtransactions * [count limit]`



Take one of the transaction ids returned from the setction above and look into the details of that transaction. 

`$ bitcoin-cli gettransaction [transaction id]`


## Constructing a Transaction

Now let's construct a customized transaction, sign it, and braodcast it to our network. 

We are going to construct a transaction using two different UTXO's in your wallet and combining them to send an amount greater than either on of them. 

First we'll need to find a list of your current UTXO set. Run the below command and select an address that has enough UTXO's to work for this excersize. 

`$ bitcoin-cli listaddressgroupings`

List the UTXO's for a selected address.

`$ bitcoin-cli listunspent 1 99999999 '''["your selected address"]'''`

This gives you a list of the UTXO’s at that address. Select two and send an amount large enough that it can only be done with both inputs. 

Note:
>Have a look at the vout associated with each UTXO. Vout is the vector of an output, basically an index number for a output in a transaction and it is necessary to identify that specific UTXO. 

Now let's create a transaction with our selected UTXO's.

`$ bitcoin-cli createrawtransaction '[{ "txid": "the transaction id for the first UTXO", "vout": [vout nubmer for this UTXO]},{ "txid": "the transaction id for the second UTXO", "vout": [vout number for this UTXO]}]' '{"address you are sending to": [amount you are sending], "your change address": [amount of change]}'`

Note:
>Bitcoin transaction fees are not explisitely specified. They are the remained of the value that is not accounted for. When constructing your transaction, be sure to deduct a fee from the amount you send back to your wallet as change. An insuficient fee could mean that your transaction will not be mined. 

The result from running `createrawtransaction` should be a hex string. This is the hex encoded trnasaction that will need to be signed by the private keys in your wallet. 

`$ bitcoin-cli signrawtransactionwithwallet [hex encoded transaction]`

The result should be a longer hex string which is both the transaction concatenated with the digital signature.

This transaction is now in a format that will be accepted by the network, so let's broadcast it. 

`$ bitcoin-cli sendrawtransaction [signed transaction hex]`


## Show Your Work

Find the transaction ID assicated with the transaction you created and post it to the classroom Riot chat. 
