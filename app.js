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
var Alert		= require('./app/models/alert');

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

// alerts
router.route('/alerts')
	.post(function(req, res) {
		var alert = new Alert();
		alert.id = req.body.id;
		alert.createdBy = req.body.user;
		alert.time = Date.now();

		if (!alert.id || !alert.createdBy || !alert.time) {
			return false;
		}

		alert.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({
				message:'Alert created!'
			});
		});
	})
	.get(function(req, res) {
		Alert.find(function(err, alerts) {
			if (err) {
				res.send(err);
			}
			res.json(alerts);
		});
	});

// single alert
router.route('/alert/:alert_id')
	.get(function(req, res) {
		Alert.findById(req.params.alert_id, function(err, alert) {
			if (err) {
				res.send(err);
			}
			res.json(bear);
		});
	})
	.put(function(req, res) {
		Alert.findById(req.params.alert_id, function(err, alert) {
			if (err) {
				res.send(err);
			}
			
			alert.alertname = req.body.alertname;

			alert.save(function(err) {
				if (err) {
					res.send(err);
				}

				res.json({
					message:'Alert updated!'
				});
			});
		});
	})
	.delete(function(req, res) {
		Alert.remove({
			_id: req.params.alert_id
		}, function(err, alert) {
			if (err) {
				res.send(err);
			}
			res.json({
				message:'Alert deleted'
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