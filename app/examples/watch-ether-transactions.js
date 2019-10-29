var Web3 = require('web3');
var web3 = new Web3('wss://rinkeby.infura.io/ws');

var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error)
        console.log(result);
})
.on("data", function(transaction){
    console.log(transaction);
});

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});