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

## Try the Simple CLI Example

## Add Store Login

## Update Hyperledger 


# Next Steps

## Events

Now that you're up to speed with the various types of blockchain systems and their use cases, you may want to hone your skills further by participating in discussion with other professionals. Visit our website at theblockchaininstitute.org/events for a full list of upcoming events, and be sure to attend conferences such as the Voice of Blockchain to stay informed as the industry continues to evolve. 


## More Education

Our website at theblockchaininstitute.org features a number of free online courses which can be great resources for specific topics. 


## Freelancing

A number of sites offer substantial bounties for developers with cryptocurrency and blockchain knowledge. These can be a great way to earn some income while also practicing the skills you've learned in this course. Check out Gitcoin.co for a large database of content and job postings.  