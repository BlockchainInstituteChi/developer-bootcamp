var Web3 = require('web3');
var web3 = new Web3('wss://ropsten.infura.io/ws');

var set = 0;

var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
    if (!error) {

    		// We will limit the output for the sake of the example, but this can be removed in production. 
    		set++;
			if ( set <= 3 ) {
			    web3.eth.getTransaction(result, function(err, result) {

			    	// This will then print the full tx details if found
			    	console.log('pinged infura for tx result')
			    	if (!err) console.log(result)
			    })
			}
    }
        
})
.on("data", function(transaction){
	console.log(transaction)
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');

});
