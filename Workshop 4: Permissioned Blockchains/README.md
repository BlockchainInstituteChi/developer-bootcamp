# Blockchain Institute Developer Crash Course

### What is this?

This repo contains instructions and sample code to help users build a hyperledger for basic supply chain operations. First, we'll cover the basics of Hyperledger and how Docker can be used to simulate a network with multiple nodes, and from there we guide the student through building their own network and deploying it as the back end to the web store we built in Workshop 2. 

# Stuff You Should Know

## System Overview

In a Hyperledger environment, nodes have several different types, and the network state is tracked in a single State Object. The State Object is a present representation of an immutable blockchain, shared by all nodes. In order for changes to be made to the State Object (think transactions being confirmed) they first need to be endorsed by a peer node, then added to the chain by an Ordering Node. Technically, any Peer Node can endorse any other, but the endorsement may be rejected by the Ordering Nodes, which leads to the need for specific Endorser Nodes for various tasks. 

In Hyperledger, the General Ledger records all proposed changes (transactions) and the Validated Ledger records only those which have been ordered (think confirmed) by Ordering Nodes. The State Object is a more traditional database object that represents the current sum of the Validated Ledger. 


## What is Docker?

Because Hyperledger systems require several node types to operate properly, one convenient way to simulate them is with a number of Virtual Machines, each providing a particular role. Since this would be very difficult to manage and set up manually, developers often use a tool like Docker to simulate these virtual machines without the headaches. 

In this workshop, we'll use a number of Docker Images, which will be deployed to Containers. Each Container will be managed through a Docker daemon, and can be imagined to be an independant node on the network (even though we already know how it will act).

## Key Terms

**Certificate Authority** - registers ECDSA keys to peer nodes

**Ordering Node** - adds properly endorsed data to the Validated Ledger

**Validated Ledger** - the Hyperledger immutable chain

**State Object** - the current state of the Validated Ledger

**SDK** - the Software Development Kit through which the client communicates with the network


## Lab Goals

In this Lab, we'll use a number of Docker containers (which we'll supply you with) to simulate a Hyperledger supply chain, and connect it to your web store. You will not learn much about docker, but we'll help you understand how Hyperledger Chaincode can be used to store semi-immutable records across a network of nodes, and we'll explore how you can connect it with your web store and use it to process changes to the supply chain. 

** Something to remember: In a public blockchain, the network is already up and running, and we just need to push code to it. In a private blockchain, we must simulate our own network in order to test code, and that's where docker comes in. 


# Setup

## Docker

Note: If you ever need to kill all your docker containers and start from scratch, these two commands in sequence should clean everything up pretty quick:
`sudo sudo docker stop $(sudo docker ps -aq)`
`sudo sudo docker rm $(sudo docker ps -aq)`

Once a node is running, you can join it with the following command:
`docker exec -it cli bash`

If it's a Hyperledger node, you can also view the genesis block with:
`cat channel-artifacts/genesis.block` 

Or something like that. 

If on ubuntu, be sure to change the permissions of docker.sock (by default this will run only as sudo) e.g. 
`sudo chown alex:alex /var/run/docker.sock`


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

