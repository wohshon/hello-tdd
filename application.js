var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = ['/hello'];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/hello', require('./lib/hello.js')());
app.get('/add', function(req, res){
  if (!req.query.a || !req.query.b){
    return res.status(400).json({ message : 'Query params a and b are required for addition' });
  }
  var a=parseInt(req.query.a);
  var b=parseInt(req.query.b);  
  var mathAdd=require('./math/add.js');
  return res.json({msg: ' result:'+mathAdd(a,b) });
});

app.get('/subtract', function(req, res){
  if (!req.query.a || !req.query.b){
    return res.status(400).json({ message : 'Query params a and b are required for subtraction' });
  }
  var a=parseInt(req.query.a);
  var b=parseInt(req.query.b);  
   var mathSub=require('./math/subtract.js');
  return res.json({msg: ' result:'+mathSub(a,b) });

});

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});

module.exports = app;
