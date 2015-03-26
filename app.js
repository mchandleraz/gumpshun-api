// app.js

/*
 * Base Setup
 */
var express 	= require('express');
var app			= express();
var bodyParser	= require('body-parser');

// config app to use bodyParser()
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

/*
 * Routes
 */
var router = express.Router();

router.get('/', function(req, res) {
	res.json({
		message:'yee'
	});
});

// all routes have /api/ prefix
app.use('/api', router);

app.listen(port);
console.log('port ' + port + ', ya dinkus');