# Workshop 4: Permissioned Blockchains

### What is this?

This repo contains instructions and sample code to help users build a hyperledger for basic supply chain operations. First, we'll cover the basics of Hyperledger and how Docker can be used to simulate a network with multiple nodes, and from there we guide the student through building their own network and deploying it as the back end to the web store we built in Workshop 2. 

NOTE: It's been over 1 year since we've updated these instructions. You may want to follow the tutorial here first: https://hyperledger-fabric.readthedocs.io/en/release-1.4/write_first_app.html

### Contents

1. [Stuff You Should Know](#stuff-you-should-know)
2. [Setup](#setup)
3. [Lab Instructions](#lab-instructions)

# Stuff You Should Know

### Students should review the difference between genesis and anchor blocks
See this https://hyperledger-fabric.readthedocs.io/en/release-1.4/channel_update_tutorial.html

Also, anchor peers for orgs is an important topic to touch on

### Reminder to touch on leader selection (static vs. dynamic) 

## System Overview

In a Hyperledger environment, nodes have several different types, and the network state is tracked in a single State Object. The State Object is a present representation of an immutable blockchain, shared by all nodes. In order for changes to be made to the State Object (think transactions being confirmed) they first need to be endorsed by a peer node, then added to the chain by an Ordering Node. Technically, any Peer Node can endorse any other, but the endorsement may be rejected by the Ordering Nodes, which leads to the need for specific Endorser Nodes for various tasks. 

In Hyperledger, the General Ledger records all proposed changes (transactions) and the Validated Ledger records only those which have been ordered (think confirmed) by Ordering Nodes. The State Object is a more traditional database object that represents the current sum of the Validated Ledger. 


## What is Docker?

Because Hyperledger systems require several node types to operate properly, one convenient way to simulate them is with a number of Virtual Machines, each providing a particular role. Since this would be very difficult to manage and set up manually, developers often use a tool like Docker to simulate these virtual machines without the headaches. 

In this workshop, we'll use a number of Docker Containers. Each Container will be managed through a Docker daemon, and can be imagined to be an independant node on the network (even though we already know how it will act).


## Key Terms

**Certificate Authority** - registers ECDSA keys to peer nodes

**Ordering Node** - adds properly endorsed data to the Validated Ledger

**Validated Ledger** - the Hyperledger immutable chain

**State Object** - the current state of the Validated Ledger

**SDK** - the Software Development Kit through which the client communicates with the network


## Lab Goals

In this Lab, we'll use a number of Docker containers (which we'll supply you with) to simulate a Hyperledger supply chain, and connect it to your web store. You will not learn much about docker, but we'll help you understand how Hyperledger Chaincode can be used to store semi-immutable records across a network of nodes, and we'll explore how you can connect it with your web store and use it to process changes to the supply chain. 

**Something to Remember:** In a public blockchain, the network is already up and running, and we just need to push code to it. In a private blockchain, we must simulate our own network in order to test code, and that's where docker comes in. 


# Setup

## Docker

Note: If you ever need to kill all your docker containers and start from scratch, these two commands in sequence should clean everything up pretty quick:
`sudo sudo docker stop $(sudo docker ps -aq)`
`sudo sudo docker rm $(sudo docker ps -aq)`

Once a node is running, you can join it with the following command:
`docker exec -it cli bash`

If on ubuntu, be sure to change the permissions of docker.sock (by default this will run only as sudo) e.g. 
`sudo chown alex:alex /var/run/docker.sock`

It's important to remember that when we are talking about accessing a node, we will do it through the docker cli, and can then access the hyperledger cli tools within that container. 


## NPM

You should already have the Node Package Manager properly installed from Workshop 2, but we'll also need to install the local packages for this project after we've used the build script to configure the Docker instances. 

First, run the build script from the root folder of this project:
```./build.sh``` 

This will automagically configure the docker images for the project and build a **javascript/** folder.


## Get the Fabric Samples

`curl -sSL http://bit.ly/2ysbOFE | bash -s`

`cd fabric-samples && export PATH=./bin/:$PATH`

Clean old installs (if this throws an error, that means there wasn't one!)

`docker rm -f $(docker ps -aq)
docker rmi -f $(docker images | grep fabcar | awk '{print $3}')`

** Hyperledger docker commands:
`docker exec cli peer chaincode`


# Lab Instructions

## 1. Deploy a network with docker containers

In order to get you started with Hyperledger, we'll use the bootstrap packages provided by the Hyperledger Foundation. This tutorial will limit the amount of complications from Docker configuration, as well as offer a framework for certificate issuance. 

### A. Run the Build Script

In practice, you'll normally need to build custom docker images and deploy them to containers. In this example, the script startFabric.sh can conveniently be used to avoid this step. This will allow you to quickly spin up a network of peer and ordering nodes, which we'll use to test some functionality in the next steps.

`cd fabric-sample/fabcar
bash ./startFabric.sh javascript`

If the script is successful, you'll now be able to see the docker containers running with `docker ps`.


### B. Enter a Docker Container

Now that the containers are running, you can enter a container and access it's Hyperledger CLI using the following command:

`docker exec -it cli bash`

This will open the a terminal to the first docker container listed in the output from `docker ps`. Now that you're in the container, you can use the hyperledger peer cli. Type the following command to see the available options:

`peer --help`

This should print the Hyperledger CLI documentation. It's important to remember that when we are talking about accessing a node, we will do it through the docker cli, and can then access the hyperledger cli tools within that container. For example, the following command will ask the first container in the network (in our case, peer0.example.org) to report their current chain code list. 

`peer chaincode list --instantiated -C mychannel`

Additionally, because the containers each run independantly, we will need to provide them with access to our files somehow, since they aren't technically on the same machine as our local file system. 

NOTE: You can also install the Hyperledger Peer CLI on your local device, but since you're running a client, and not an active peer, there's really no reason to use it locally. 


## 2. Understanding Smart Contracts

In the last step, we used the Hyperledger sample script to launch a set of Docker containers specifically created to run a set of nodes. In each of thse containers, the chaincode was preloaded for convenience, and resides under the /opt/ directory. In this lesson, we'll review how the chain code is written, and explore how it can run across a variety of software languages. For the sake of simplicity, we'll be focusing on the Javascript chaincode, but we can also operate with 

### A. Open the Chaincode Sample Template

Open `fabric-samples/chaincode/fabcar/javascript/lib/fabcar.js` in a text editor to see the inner workings of the contract. 

### B. Viewing the Ledger

To view the genesis block, you'll need to access the node via the Docker CLI. To do this, we first need to know the name of our container that the node is running in. 

Once you're connected, you can find the genesis block and channel data in the channel-artifacts/ folder. 

`docker exec -it cli cat channel-artifacts/genesis.block` 


## C. Viewing the Chain Code

We can also find the chain code in a similar fashion. The following command will ask the first container in the network (in our case, peer0.example.org) to report their current chain code list. 

`docker exec -it cli peer chaincode list --instantiated -C mychannel`



## 3. Using the Hyperledger SDK

Now that the network is up and running, we can use the SDK to interact with and configure the Verified Ledger. 

### A. Register an Admin and a User

The first thing we'll need to do is create credentials for an admin and user role. We'll store these credentials locally in a new directory. 

To create the admin user, run 

`node enrollAdmin.js`

To create a user role, run 

`node registerUser.js`

Now that the user roles have been created, you'll also find their corresponding keys in wallets/. Be sure to review the code within these two files to further understand how the users are added to the system state. 


### B. Query the State Object

You can run the query.js example script from fabcar/javascript/. This script should output a JSON formatted list of cars which have been registered in the system. 

`node query.js`

NOTE: It may help to use a JSON Linter to break up this output and make it a bit easier to read. https://jsonlint.com/


### C. Add a New Car

Next, we'll explore how to add a new entry to the ledger. In order for this to work, the changes to the State Object need to be packaged into a 'Transaction' and pushed to the network. After they're received by the network, a peer must endorse them, and then an ordering node will take care of adding them to the chain. Conveniently, the SDK takes care of most of this. 

Open `fabric-samples/fabcar/javascript/invoke.js` in a text editor to see how these steps are handled by the Javascript SDK.  

Try editing line 41 of this file to change the new entry values. When you're satisfied with your entry, run the script with `node invoke.js` to trigger the transaction broadcast. The line looks like this:

`await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');`

Once you've updated the line and run the script, you can then verify that your car was added to the State Object by running `node query.js` once again. 


### D. Change Car Ownership

In order for your web store to sell a car, you'll need to be able to update the car's owner. In the fabcar.js smart contract (see 2.A) you'll find that there's another function, 'changeCarOwnership'. You'll want to update the parameters passed in the transaction to match the input fields in the smart contract. 

The smart contract function is written as 

`async changeCarOwner(ctx, carNumber, newOwner) {
 ...
}`

The 'ctx' variable is automatically completed by the SDK, so we just need to fill the other two fields. Try editing line 41 of invoke.js to read as follows.

`await contract.submitTransaction('changeCarOwner', 'CAR2', 'Alex')`

Now, when you run `node invoke.js` the peer network will update the State Object so that CAR2 has Alex as the owner. Run `node query.js` again to verify that it worked as expected. 


## 4. Connect your Hyperledger to your Web Store

Now that you've got a working Hyperledger network, we'll extend the functionality of your web store to feature a live inventory from your supply chain, and to track the change of ownership of each car as it's sold. 


### A. Install Dependancies

In order for the web store to connect to the network of Docker containers, we'll need to move to our `app/` directory once again and install the Hyperledger NPM Modules. As with the original set of dependancies, we'll need to install each with npm. 

`npm install fabric-ca-client fabric-network`

We'll also need filesystem access to read the wallet files, so we'll install these as well

`npm install fs path`

If everything works, you should now be able to copy the `wallet/` directory and the `query.js` script to the `app/` directory of your web store and run `node query.js` just like we did in the `fabric-samples/` directory.


### B. Add Live Product View

It would be a shame if someone purchase a car from you and you had to refund their cryptocurrency because that car had already been sold. In order to avoid your inventory being out of date, let's configure your store to fetch the product inventory from the hyperledger archive.

The template we've provided already fetches products for the client from the server in the `app/` directory, so we'll just need to update that API function to check Hyperledger for the most recent inventory before displaying products in the store. All you'll need to do is to copy the code from `query.js` and add it to the function called `getProductList` in the file `controllers/store.js`.

Once you've got the car query list displaying in your store, ask an instructor to verify that you've set everything up properly before proceeding to the next step. 


### C. Sell a Car

In order to sell a car, we will need to update the owner in our Hyperledger network. Use the example we created in 3.D to expand the functionality of your store so that the act of purchasing a car results in the 'owner' field of the car's State Object entry being updated to match the address of the sender of the cryptocurrency payment which was made to pay for it. 



