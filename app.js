// app.js

/*
 * Base Setup
 */
var express 	= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var port 		= process.env.PORT || 8080;
var router 		= express.Router();
var mongoose	= require('mongoose');

// config app to use bodyParser()
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/*
 * Routes
 */
router.get('/', function(req, res) {
	res.json({
		message:'yee'
	});
});

// all routes have /api/ prefix
app.use('/api', router);

/*
 * Database
 */
mongoose.connect('mongodb://api:prUja9rE@ds049181.mongolab.com:49181/gumption');

app.listen(port);
console.log('port ' + port + ', ya dinkus');