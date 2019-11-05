module.exports = function(app){

  var heartbeat = require('./controllers/heartbeat.js');
  app.get('/', heartbeat.helloWorld);

  var payment = require('./controllers/payment.js');
  app.post('/getAddress', payment.getAddress);

}

