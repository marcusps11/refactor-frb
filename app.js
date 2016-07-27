var express 				= require('express');
var cors          	= require('cors');
var path            = require('path');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require("method-override");
var app 						= express();
var twitter = require('./controllers/twitterController');
var instagram = require('./controllers/instagramController');
var mailgun = require('./controllers/mailgunController');


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

var routes = require('./config/routes');


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.get("/", function(req, res) {
  console.log('hello')
  res.render("index.html")
});



app.use("/api", routes);

app.listen(process.env.PORT || 3000 );

