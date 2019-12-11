# Mongo DB Tutorial

The web store example we'll use in this bootcamp builds on a MongoDB NoSQL database. We'll use it to store JSON objects directly in the database in what's called a collection.

## Using the CLI
To open the Mongo CLI, simply type `mongo` into a terminal window. This should produce an output like the one shown below:

```
mongo
MongoDB shell version v3.6.8
connecting to: mongodb://127.0.0.1:27017
Implicit session: session { "id" : UUID("36a8d326-9d5e-434e-a2e8-e974f3165866") }
MongoDB server version: 3.6.8
Server has startup warnings: 
2019-12-08T19:51:35.154-0600 I STORAGE  [initandlisten] 
2019-12-08T19:51:35.155-0600 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2019-12-08T19:51:35.155-0600 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2019-12-08T19:51:36.134-0600 I CONTROL  [initandlisten] 
2019-12-08T19:51:36.134-0600 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-12-08T19:51:36.134-0600 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-12-08T19:51:36.134-0600 I CONTROL  [initandlisten] 
> 
```

You can now run commands! Try typing `help` to get started.

Note: If this does not work, please be sure to follow the installation instructions in (Workshop 2)[https://github.com/BlockchainInstituteChi/developer-bootcamp/tree/master/workshop_2_build_a_crypto_store#install-mongodb].

## Using the NPM Object

Mongoose is an NPM library which can be integrated to support various database access and update functionalities. 


(Read the full docs here.)[https://docs.mongodb.com/manual/]