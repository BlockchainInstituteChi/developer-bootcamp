// app.js
// Run with 'node app.js' to launch the app

// Be sure to install the following packages via `npm i < packagename >` and configure config.json
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose   = require('mongoose');
var config 	   = require('./config.json')
var cors 	       = require('cors')


// Set up the db
// var mongoUri = 'mongodb://localhost/node';
// mongoose.connect(mongoUri);
// var db = mongoose.connection;
// db.on('error', function () {
//   throw new Error('unable to connect to database at ' + mongoUri);
// });

// Set up connectivity
var port = config.server_port;
var router = express.Router();

// Set up H-W routing
router.get('/', function(req, res) {
   res.send('Hello World!');
   console.log('Hello World Ran!');
});

// Set the target area
app.use('/api', router);

// CORS Whitelist
var originsWhitelist = [
  'http://localhost:8001/'
];
var corsOptions = {
  origin: function(origin, callback){
        console.log(origin);
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        console.log(isWhitelisted);
        callback(null, isWhitelisted);
  },
  credentials:true
}

app.options('*', cors(corsOptions));

// Set the access headers for browser preflight
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Include middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Include models
// require('./models/deposit.js');

// Require routes
require('./routes.js')(app);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);

