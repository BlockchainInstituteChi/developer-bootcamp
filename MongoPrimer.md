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

Note: If this does not work, please be sure to follow the installation instructions in [Workshop 2](https://github.com/BlockchainInstituteChi/developer-bootcamp/tree/master/workshop_2_build_a_crypto_store#install-mongodb).


### Basic Commands
`help` will list all of the available options
`show dbs` will print a list of available databases
`show collections` will print a list of available collections

To begin accessing records, select a database with 
`use < db name >`


### Using Records
Once you've opened a database, you can now reference it with the `db` variable as shown in the commands below. In each case, a method receives a filter object, and operates only on records that match. 

* `db.collection.find(filter)` will return all the records in a collection
* `db.collection.findOne(filter)` will return a singe record from a collection
* `db.collection.insert('<JSON String>')` will create a new record
* `db.collection.deleteMany(filter)` deletes multiple documents from a collection

***NOTE***: In each case, be sure to replace 'collection' with the name of the collection you found with `show collections`.

For our system, you can clear all transaction records using the following command:
`db.transactions.deleteMany({})`


## Using the NPM Object

Mongoose is an NPM library which can be integrated to support various database access and update functionalities. To import the module, install it with `npm install mongoose` and add the following line to the head of your file:

`var mongoose = require('mongoose')`

### Using Collection Schema

We've prepared a sample schema for the transaction object in *store/app/model/transaction.js*. The contents of this file are shown below for reference:

```
// Import Dependancies
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Mongoose Schema - add any additional data points here
var txSchema = new Schema ({
  amount    : String, 
  product   : String,
  status    : String,
  nonce     : String,
  timeStamp : Date,
  address   : String,
  currency  : String,
});

module.exports = mongoose.model('transaction', txSchema);
```

This schema is defined in order to format the new mongo collection, which we can instantiate with the following line:

`var tx       = mongoose.model('transaction');`

We can now use the `tx` object to run queries against the collection, just like `db.collection` in console from the previous section. For example, we can create a new record by generating a JavaScript object and passing it to the `tx.create()` method.

```
var newTx = {
	  amount    : 10.99, 
	  product   : 1029,
	  status    : 'pending',
	  nonce     : ( Math.random() * 1000 ),
	  timeStamp : new Date(),
	  address   : '0xb9c5714089478a327f09197987f16f9e5d936e8a',
	  currency  : 'ETH',
};

tx.create(newTx, function(err, txRecord) {
	if ( err ) {
		console.log( 'error creating new transaction ', err );
		
	} else {
		console.log( '\r\n\r\nnew tx created \r\n ', txRecord );
		
	}
})
```

This record can then be located by passing a matching filter to the `tx.find()` method.

```
var filter = { 
	address:  '0xb9c5714089478a327f09197987f16f9e5d936e8a'
}

tx.findOne(filter, function (err, record) {
	if ( err ) {
		console.log( 'error finding records for filter ', filter, 'error:', err );
		
	} else {
		console.log( '\r\n\r\nRecords found for filter\r\n', filter, '\r\n Records:', txRecord );
		
	}	
}
```

***Note***: If you are unfamiliar with node.js, you may want to review the concept of [callback functions](https://guide.freecodecamp.org/javascript/callback-functions/) for handling asynchronous behaviours.
 
[Read the full docs here.](https://docs.mongodb.com/manual/)


### Retrieving Last Record by Timestamp

To the last paid transaction for a particular currency you can use the following snippet:

```
tx.findOne({ currency: 'BTC', status: 'paid' }).sort({'timestamp':-1}).forEach( 
   function(doc){ 
      lastTimeStamp = doc._id.getTimestamp(); 
   }
)
```