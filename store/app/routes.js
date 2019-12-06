module.exports = function(app){

  var heartbeat = require('./controllers/heartbeat.js');
  app.get('/', heartbeat.helloWorld);

  var payment = require('./controllers/payment.js');
  app.post('/getAddress', payment.getAddress);
  app.post('/txIsPaid', payment.txIsPaid);

  var store = require('./controllers/store.js');
  app.post('/getProductList', store.getProductList);

}

