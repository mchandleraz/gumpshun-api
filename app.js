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
var User		= require('./app/models/user');

// config app to use bodyParser()
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/*
 * Routes
 */

// middleware
router.use(function(req, res, next) {
	next(); // cant stop wont stop.
	// TODO: Auth!
});

// index
router.get('/', function(req, res) {
	res.json({
		message:'yee'
	});
});

// users
router.route('/users')

	.post(function(req, res) {
		var user = new User();
		user.username = req.body.username;

		if (!user.username) {
			return false;
		}

		user.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({
				message:'User created!'
			});
		});
	})
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	});

// single user
router.route('/user/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) {
				res.send(err);
			}
			res.json(bear);
		});
	})
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) {
				res.send(err);
			}
			
			user.username = req.body.username;

			user.save(function(err) {
				if (err) {
					res.send(err);
				}

				res.json({
					message:'User updated!'
				});
			});
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