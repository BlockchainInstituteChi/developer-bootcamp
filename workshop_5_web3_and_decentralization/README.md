# Workshop 5: Web3 

### What is this?

This final module of the Blockchain Institute Developer Bootcamp provides a preliminary view of the Web3 technology stack and how it can be used to increase transparency and accountability online. Beginning with a review of the core technologies at play, we'll demonstrate how decentralized storage, computing, and identity can be combined to create digital ecosystems that empower the user and reduce risks of monopolization.

### Contents

1. [Stuff You Should Know](#stuff-you-should-know)
2. [Ethereum Fundamentals](#ethereum-fundamentals)
3. [Setup](#setup)
4. [Lab Instructions](#lab-instructions)
5. [Next Steps](#next-steps)

# Stuff You Should Know

## Web3 Stack

The Web3 stack refers to the components which together enable a decentralized internet. Since Ethereum's introduction of Smart Contracts a number of supporting technologies have evolved to provide supplemental capabilities and expand the functionality of these tools. 

### Decentralized Computing

Since Ethereum's debut in 2015, a number of decentralized computation networks have emerged, each with their own limitations and benefits. In each case, a network of peers participate in an economic game, earning rewards as they perform computational tasks. By spreading the computation across many nodes, these systems reduce fault risk and ensure long term stability of their networks. 

### Decentralized Storage

While torrenting has been a fairly commonplace activity online since the early 2000's, it's only recently that this technology has formally transitioned to a protocol and network based solution. In the Interplanetary File System (IPFS) network, users can store digital files across many peer nodes, and retrieve them using a hash address. This enables a wide range of applications which require data storage to persist in order to work properly. 

### Decentralized Identity

One of the major limitations of the Web 2.0 era comes from the lack of online credentials. In most cases, when a user is required to verify identity, they do so by uploading a copy of a physical identity document of some kind. Decentralized Identity solutions cultivate a sterile environment by linking these verification events to a set of digital keys, which can in turn be used to create trusted relationships without further transmissions of the identifying document. 


## Ethereum Fundamentals

The Ethereum Virtual Machine (EVM) is the leading Decentralized Computing environment and supports a number of Web3 projects, so it will help to quickly review some terminology. 

### The Ethereum Virtual Machine (EVM)

Ethereum provides a common protocol that allows a user to interact with a wide network of peers as if they were a single computational device. The EVM is turing complete and uses the custom-built language Solidity for on-chain code. Each peer node independantly runs the code and participates in a consensus model similar to Bitcoin to establish which data should be added to the chain. 

### State Machines

As described in the original Ethereum Whitepaper from 2015, the EVM reimagines the blockchain consensus mechanism as a *State Transition Function* which enables a network of peers to collectively move from one network state to the next. 

In this way, the EVM is imagined as a single state object, which is collectively agreed upon by a majority of peer nodes. This differs from the Bitcoin model as each account has a current balance, and does not require a client to balance the UTXOs to determine the account balance.

### Smart Contracts

A smart contract is a piece of code which is deployed to the Ethereum blockchain. Once deployed, the contract will have it's own address on the network, similar to a standard wallet, and can be 'triggered' by processing a new transaction which includes an appropriate fee. All computation on-chain must be processed via a smart contract. 

### Gas

In order to prevent abuse of the network a secondary currency unit known as Gas is used to pay for contract execution or transaction processing. Gas can only be purchased using Ether, and the price of Gas is determined by a publicly transparent auction amongst mining nodes. 

In order to process computations or transactions on-chain, and appropriate amount of gas must be prepaid to the network. Any unused gas is automatically refunded to the account of the sender upon completion of the contract execution. 

# NEED TO CLARIFY GAS PRICING PROCESS


# Setup 

In this workshop we'll be using the same web store template that we've built out through the previous 4 modules. To get started, open this store in a browser. You'll want to make sure your hyperledger network from Workshop 4 is still running as well, and be sure that the Lightning CLI wallet runs properly as well.

# Setup

## Hyperledger

## Bitcoin Node

## Lightning Node


# Lab Instructions

## Download the Uport App

Visit the iOS or Google Play store on your mobile device and download the uPort Connect app. Follow the prompts to create a new uPort identity. The private keys for this new identity will be stored on your phone, and new signatures can be posted using the app in order to verify credentials with a particular authority. 

## Look up your registration

When your uPort account was registered, a signature was added to the uPort Registry Smart Contract. You can now look up your public key on this contract using the url below:



## Log into the institute website

Visit https://theblockchaininstitute.org/wp-login.php to test your new account with our website. 

## Register your own organization

Once you're 

## Try the Simple CLI Example

Open examples/simpleServer and run 'npm install' to load the dependancies. 

You can now use `node registerIdentity.js` to generate a new address, and add it to lines 16-17 of credentialServer.js to set up a basic credentialling server. 

Try running `node credentialServer.js` and you should receive an ngrok proxy URL through which to view your app. Scan the QR code displayed there with your uPort mobile app to see the verification flow.

## Add Store Login

### Try the simple login example

Open *example/simpleLogin/* and run `npm install` to load the packages. Once the packages have installed, you can run `node server.js` to launch the example login portal. Open the ngrok url that is printed in a browser to see the portal. 

Before you scan the QR code with uPort mobile, be sure to open the network inspection view of your browser. As you scan the QR Code, make a note of how the disclosure request is received by the client session. 

### Update the simple login to make a selective disclosure request



### Update your web store

Using the simple login as an example, update your Web Store to allow a user to verify their identity before making a purchase. In order to do this, you'll want to update the login flow to offer the user a choice to verify their identity before proceeding to the checkout. 

In the disclosure request, update the request object to ask the user for their 'BlockchainInstituteID' credential. This selective disclosure request will now return a Blockchain Institute User ID as it was issued when the user logged into our website.  

## Update Hyperledger 


# Next Steps

## Events

Now that you're up to speed with the various types of blockchain systems and their use cases, you may want to hone your skills further by participating in discussion with other professionals. Visit our website at theblockchaininstitute.org/events for a full list of upcoming events, and be sure to attend conferences such as the Voice of Blockchain to stay informed as the industry continues to evolve. 


## More Education

Our website at theblockchaininstitute.org features a number of free online courses which can be great resources for specific topics. 


## Freelancing

A number of sites offer substantial bounties for developers with cryptocurrency and blockchain knowledge. These can be a great way to earn some income while also practicing the skills you've learned in this course. Check out Gitcoin.co for a large database of content and job postings.  